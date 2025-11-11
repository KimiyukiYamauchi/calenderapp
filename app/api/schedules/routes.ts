// app/api/schedules/route.ts

import { NextRequest, NextResponse } from 'next/server';
import {
  getSchedules,
  createSchedule,
  createScheduleBulk,
} from '@/lib/microcms';
import type { ScheduleInput, APIResponse, Schedule } from '@/lib/types';

/**
 * GET /api/schedules
 * 予定一覧を取得
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const year = searchParams.get('year');
    const month = searchParams.get('month');

    const schedules = await getSchedules(
      year ? parseInt(year) : undefined,
      month ? parseInt(month) : undefined
    );

    return NextResponse.json<APIResponse<Schedule[]>>({
      success: true,
      data: schedules,
    });
  } catch (error) {
    console.error('Failed to fetch schedules:', error);

    return NextResponse.json<APIResponse<null>>(
      {
        success: false,
        error: '予定の取得に失敗しました',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/schedules
 * 予定を作成（単体または一括）
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 一括作成の場合
    if (Array.isArray(body)) {
      const schedules = await createScheduleBulk(body as ScheduleInput[]);

      return NextResponse.json<APIResponse<Schedule[]>>(
        {
          success: true,
          data: schedules,
        },
        { status: 201 }
      );
    }

    // 単体作成の場合
    const schedule = await createSchedule(body as ScheduleInput);

    return NextResponse.json<APIResponse<Schedule>>(
      {
        success: true,
        data: schedule,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to create schedule:', error);

    return NextResponse.json<APIResponse<null>>(
      {
        success: false,
        error: '予定の作成に失敗しました',
      },
      { status: 500 }
    );
  }
}