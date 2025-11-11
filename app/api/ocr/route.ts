// app/api/ocr/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import type { OCRResult, APIResponse } from '@/lib/types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as string;

    if (!image) {
      return NextResponse.json<APIResponse<null>>(
        {
          success: false,
          error: '画像がアップロードされていません',
        },
        { status: 400 }
      );
    }

    // Base64からmimeTypeとデータを抽出
    const mimeTypeMatch = image.match(/data:([^;]+);/);
    const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'image/jpeg';
    const base64Data = image.split(',')[1] || image;

    // Claude APIで画像を解析
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mimeType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
                data: base64Data,
              },
            },
            {
              type: 'text',
              text: `この画像からスケジュール・予定情報を抽出してください。

以下のJSON配列形式で返してください。予定が複数ある場合は配列に複数のオブジェクトを含めてください。

\`\`\`json
[
  {
    "date": "YYYY-MM-DD形式の日付（画像から読み取れない場合はnull）",
    "startTime": "HH:mm形式の開始時間（読み取れない場合はnull）",
    "endTime": "HH:mm形式の終了時間（読み取れない場合はnull）",
    "title": "予定のタイトル（必須）",
    "description": "予定の詳細説明（あれば）",
    "category": "work/private/event/otherのいずれか（推測）"
  }
]
\`\`\`

重要な注意事項:
- JSONのみを返してください（前後の説明文は不要）
- マークダウンのコードブロック記号（\`\`\`）は含めないでください
- 日付や時間が読み取れない場合はnullを設定
- 予定が見つからない場合は空配列[]を返す
- カテゴリーは内容から推測してwork（仕事）、private（プライベート）、event（イベント）、other（その他）のいずれかを選択`,
            },
          ],
        },
      ],
    });

    // レスポンスからテキストを抽出
    const responseText = message.content
      .filter((block) => block.type === 'text')
      .map((block) => (block.type === 'text' ? block.text : ''))
      .join('');

    // JSONをパース
    let schedules: OCRResult[] = [];
    try {
      // マークダウンのコードブロックを除去
      const cleanedText = responseText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

      schedules = JSON.parse(cleanedText);

      // 配列でない場合は配列に変換
      if (!Array.isArray(schedules)) {
        schedules = [schedules];
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Response text:', responseText);
      
      return NextResponse.json<APIResponse<null>>(
        {
          success: false,
          error: '画像から予定を抽出できませんでした。別の画像をお試しください。',
        },
        { status: 500 }
      );
    }

    return NextResponse.json<APIResponse<OCRResult[]>>({
      success: true,
      data: schedules,
    });
  } catch (error) {
    console.error('OCR processing error:', error);

    return NextResponse.json<APIResponse<null>>(
      {
        success: false,
        error: 'OCR処理中にエラーが発生しました',
      },
      { status: 500 }
    );
  }
}