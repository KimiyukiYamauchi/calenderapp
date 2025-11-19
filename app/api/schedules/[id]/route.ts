import { NextRequest, NextResponse } from "next/server";
import { getSchedule, updateSchedule, deleteSchedule } from "@/lib/microcms";
import type { ScheduleInput, APIResponse, Schedule } from "@/lib/types";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const schedule = await getSchedule(id);

    return NextResponse.json<APIResponse<Schedule>>({
      success: true,
      data: schedule,
    });
  } catch (error) {
    console.error(`Failed to fetch schedule ${id}:`, error);
    return NextResponse.json<APIResponse<null>>(
      { success: false, error: "予定の取得に失敗しました" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const body = await request.json();
    const updated = await updateSchedule(id, body as Partial<ScheduleInput>);

    return NextResponse.json<APIResponse<Schedule>>({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error(`Failed to update schedule ${id}:`, error);
    return NextResponse.json<APIResponse<null>>(
      { success: false, error: "予定の更新に失敗しました" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    await deleteSchedule(id);
    return NextResponse.json<APIResponse<null>>({ success: true, data: null });
  } catch (error) {
    console.error(`Failed to delete schedule ${id}:`, error);
    return NextResponse.json<APIResponse<null>>(
      { success: false, error: "予定の削除に失敗しました" },
      { status: 500 }
    );
  }
}
