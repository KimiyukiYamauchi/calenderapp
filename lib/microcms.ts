// lib/microcms.ts

import { createClient } from 'microcms-js-sdk';
import type { Schedule, ScheduleInput, MicroCMSResponse } from './types';

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

// microCMSクライアントの作成
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

/**
 * 全予定を取得
 */
export async function getSchedules(
  year?: number,
  month?: number
): Promise<Schedule[]> {
  try {
    let filters = '';
    
    if (year && month) {
      // 指定された月の予定のみを取得
      const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
      const endDate = `${year}-${String(month).padStart(2, '0')}-31`;
      filters = `date[greater_than]${startDate}[and]date[less_than]${endDate}`;
    }

    const response = await client.get<MicroCMSResponse<Schedule>>({
      endpoint: 'schedules',
      queries: {
        limit: 100,
        orders: 'date',
        ...(filters && { filters }),
      },
    });

    return response.contents;
  } catch (error) {
    console.error('Failed to fetch schedules:', error);
    throw error;
  }
}

/**
 * 特定の予定を取得
 */
export async function getSchedule(id: string): Promise<Schedule> {
  try {
    const schedule = await client.get<Schedule>({
      endpoint: 'schedules',
      contentId: id,
    });

    return schedule;
  } catch (error) {
    console.error(`Failed to fetch schedule ${id}:`, error);
    throw error;
  }
}

/**
 * 予定を作成
 */
export async function createSchedule(
  data: ScheduleInput
): Promise<Schedule> {
  try {
    const response = await client.create({
      endpoint: 'schedules',
      content: {
        ...data,
        completed: data.completed ?? false,
      },
    });

    return {
      ...data,
      id: response.id,
      completed: data.completed ?? false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Schedule;
  } catch (error) {
    console.error('Failed to create schedule:', error);
    throw error;
  }
}

/**
 * 予定を更新
 */
export async function updateSchedule(
  id: string,
  data: Partial<ScheduleInput>
): Promise<Schedule> {
  try {
    await client.update({
      endpoint: 'schedules',
      contentId: id,
      content: data,
    });

    // 更新後のデータを取得
    return await getSchedule(id);
  } catch (error) {
    console.error(`Failed to update schedule ${id}:`, error);
    throw error;
  }
}

/**
 * 予定を削除
 */
export async function deleteSchedule(id: string): Promise<void> {
  try {
    await client.delete({
      endpoint: 'schedules',
      contentId: id,
    });
  } catch (error) {
    console.error(`Failed to delete schedule ${id}:`, error);
    throw error;
  }
}

/**
 * 複数の予定を一括作成
 */
export async function createScheduleBulk(
  schedules: ScheduleInput[]
): Promise<Schedule[]> {
  try {
    const results = await Promise.all(
      schedules.map((schedule) => createSchedule(schedule))
    );
    return results;
  } catch (error) {
    console.error('Failed to create schedules in bulk:', error);
    throw error;
  }
}

/**
 * 日付範囲で予定を取得
 */
export async function getSchedulesByDateRange(
  startDate: string,
  endDate: string
): Promise<Schedule[]> {
  try {
    const filters = `date[greater_than]${startDate}[and]date[less_than]${endDate}`;

    const response = await client.get<MicroCMSResponse<Schedule>>({
      endpoint: 'schedules',
      queries: {
        limit: 100,
        orders: 'date',
        filters,
      },
    });

    return response.contents;
  } catch (error) {
    console.error('Failed to fetch schedules by date range:', error);
    throw error;
  }
}