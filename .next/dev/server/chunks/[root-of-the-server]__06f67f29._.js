module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/calenderapp/app/api/ocr/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/api/ocr/route.ts
__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@anthropic-ai/sdk/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__Anthropic__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/@anthropic-ai/sdk/client.mjs [app-route] (ecmascript) <export Anthropic as default>");
;
;
const anthropic = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__Anthropic__as__default$3e$__["default"]({
    apiKey: process.env.ANTHROPIC_API_KEY
});
async function POST(request) {
    try {
        // 明確な早期チェック: APIキーが設定されていなければわかりやすく返す
        if (!process.env.ANTHROPIC_API_KEY) {
            console.error("Anthropic API key is not configured (ANTRHOPIC_API_KEY missing)");
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "サーバー側の設定で Anthropic API キーが設定されていません。環境変数 ANTHROPIC_API_KEY を確認してください。"
            }, {
                status: 500
            });
        }
        const formData = await request.formData();
        const image = formData.get("image");
        if (!image) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "画像がアップロードされていません"
            }, {
                status: 400
            });
        }
        // Base64からmimeTypeとデータを抽出
        const mimeTypeMatch = image.match(/data:([^;]+);/);
        const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : "image/jpeg";
        const base64Data = image.split(",")[1] || image;
        // 名前（フォームで渡された場合）
        const name = formData.get("name") || "";
        // Claude APIで画像を解析
        // 名前が渡されていれば、その名前に関連するシフトのみ抽出するよう指示を追加します。
        const nameInstruction = name ? `\n\n注意: 画像中に氏名や担当者名が記載されている場合は、名前が "${name}" に該当する予定（シフト）のみを抽出してください。該当がない場合は空配列を返してください。` : "";
        // より構造化されたJSONを返すようプロンプトを強化します。
        const prompt = `この画像からスケジュール・予定情報を抽出してください。\n\n必ず返す形式: JSON配列。配列の各要素は少なくとも title を含むオブジェクトで、可能なら以下フィールドを出力してください: date, startTime, endTime, title, description, category, assignedTo (配列), rawText (文字列)。assignedTo が空でも空配列を返してください。\n\n出力は"JSONのみ"にしてください。余計な説明や注釈、マークダウンは一切含めないでください。日付や時間が読み取れない場合は null を使用し、予定が無ければ空配列 [] を返してください。\n\n以下に複数の具体例を示します。必ず同じフィールド名で返してください。\n\n例1（複数名・日付あり）:\n[\n  {\n    "date": "2025-11-20",\n    "startTime": "09:00",\n    "endTime": "12:00",\n    "title": "会議（営業部）",\n    "description": "来期予算の打ち合わせ",\n    "category": "work",\n    "assignedTo": ["田中 太郎", "佐藤 花子"],\n    "rawText": "11/20 9:00-12:00 田中/佐藤 会議 来期予算"\n  }\n]\n\n例2（氏名が画像に明記され、該当者のみ抽出）:\n[\n  {\n    "date": "2025-11-21",\n    "startTime": "14:00",\n    "endTime": "15:00",\n    "title": "面談",\n    "description": "新人面談",\n    "category": "work",\n    "assignedTo": ["山田 太郎"],\n    "rawText": "11/21 山田 太郎 14:00 面談"\n  }\n]\n\n例3（日時読み取り困難）:\n[\n  {\n    "date": null,\n    "startTime": null,\n    "endTime": null,\n    "title": "納期未定の打ち合わせ",\n    "description": "詳細は未記入",\n    "category": "other",\n    "assignedTo": [],\n    "rawText": "未定 打ち合わせ"\n  }\n]\n\n注: assignedTo が得られない場合でも空の配列を返すこと、rawText には可能な限り元テキスト断片を入れることを徹底してください。` + nameInstruction;
        let message;
        try {
            message = await anthropic.messages.create({
                model: "claude-sonnet-4-20250514",
                max_tokens: 2000,
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "image",
                                source: {
                                    type: "base64",
                                    media_type: mimeType,
                                    data: base64Data
                                }
                            },
                            {
                                type: "text",
                                text: prompt
                            }
                        ]
                    }
                ]
            });
        } catch (llmError) {
            console.error("Anthropic API error:", llmError);
            const friendly = llmError?.message || String(llmError);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "OCR 処理で外部 API からエラーが返りました: " + friendly
            }, {
                status: 502
            });
        }
        // レスポンスからテキストを抽出
        const responseText = message.content.filter((block)=>block.type === "text").map((block)=>block.type === "text" ? block.text : "").join("");
        // JSONをパース
        let schedules = [];
        try {
            // マークダウンのコードブロックを除去
            const cleanedText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
            schedules = JSON.parse(cleanedText);
            // 配列でない場合は配列に変換
            if (!Array.isArray(schedules)) {
                schedules = [
                    schedules
                ];
            }
            // サーバー側でも名前フィルタをかける（クライアントから name が渡されている場合）
            if (name && name.trim()) {
                const nmRaw = name.trim();
                const normalize = (s)=>{
                    if (!s) return "";
                    // 小文字化・空白削除・全角英数字を半角化・正規化
                    const fwToHw = (str)=>str.replace(/[-]/g, (ch)=>ch).replace(/[！-～]/g, (c)=>String.fromCharCode(c.charCodeAt(0) - 0xfee0));
                    return fwToHw(s).normalize("NFKC").toLowerCase().replace(/\s+/g, "").replace(/[\p{P}\p{S}]/gu, "");
                };
                // レーベンシュタイン距離（簡易実装）
                const levenshtein = (a, b)=>{
                    const dp = Array.from({
                        length: a.length + 1
                    }, ()=>new Array(b.length + 1).fill(0));
                    for(let i = 0; i <= a.length; i++)dp[i][0] = i;
                    for(let j = 0; j <= b.length; j++)dp[0][j] = j;
                    for(let i = 1; i <= a.length; i++){
                        for(let j = 1; j <= b.length; j++){
                            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                            dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
                        }
                    }
                    return dp[a.length][b.length];
                };
                const nm = normalize(nmRaw);
                const matchesName = (item)=>{
                    // 1) まず assignedTo があればそちらを優先して照合
                    const as = item.assignedTo;
                    if (Array.isArray(as) && as.length > 0) {
                        for (const person of as){
                            const p = normalize(person);
                            if (!p) continue;
                            if (p.includes(nm) || nm.includes(p)) return true;
                            const maxDist = Math.max(1, Math.floor(Math.max(nm.length, p.length) * 0.3));
                            if (levenshtein(p, nm) <= maxDist) return true;
                        }
                        return false;
                    }
                    // 2) 次に title/description/rawText を使って照合
                    const fields = [
                        item.title,
                        item.description,
                        item.rawText
                    ].filter(Boolean).map((s)=>normalize(String(s)));
                    for (const f of fields){
                        if (f.includes(nm) || nm.includes(f)) return true;
                        if (levenshtein(f, nm) <= Math.max(1, Math.floor(nm.length * 0.25))) return true;
                    }
                    return false;
                };
                const filtered = schedules.filter(matchesName);
                // 指示通り、該当がなければ空配列を返す
                schedules = filtered;
            }
        } catch (parseError) {
            console.error("JSON parse error:", parseError);
            console.error("Response text:", responseText);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "画像から予定を抽出できませんでした。別の画像をお試しください。"
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: schedules
        });
    } catch (error) {
        console.error("OCR processing error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "OCR処理中にエラーが発生しました"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__06f67f29._.js.map