// lib/types.ts

/**
 * カテゴリーの型
 */
export type Category = 'work' | 'private' | 'event' | 'other';

/**
 * 画像情報の型
 */
export interface ImageInfo {
  url: string;
  width: number;
  height: number;
}

/**
 * 予定の型
 */
export interface Schedule {
  id: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  title: string;
  description: string;
  category: Category;
  color: string; // HEX color
  completed: boolean;
  sourceImage?: ImageInfo;
  createdAt: string;
  updatedAt: string;
}

/**
 * 予定作成時の入力データ型
 */
export interface ScheduleInput {
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  category: Category;
  color: string;
  completed?: boolean;
  sourceImage?: ImageInfo;
}

/**
 * OCR抽出結果の型
 */
export interface OCRResult {
  date?: string;
  startTime?: string;
  endTime?: string;
  title: string;
  description?: string;
  category?: Category;
}

/**
 * カテゴリー情報
 */
export interface CategoryInfo {
  value: Category;
  label: string;
  defaultColor: string;
}

/**
 * カテゴリー定義
 */
export const CATEGORIES: CategoryInfo[] = [
  {
    value: 'work',
    label: '仕事',
    defaultColor: '#3B82F6', // blue-500
  },
  {
    value: 'private',
    label: 'プライベート',
    defaultColor: '#10B981', // green-500
  },
  {
    value: 'event',
    label: 'イベント',
    defaultColor: '#F59E0B', // amber-500
  },
  {
    value: 'other',
    label: 'その他',
    defaultColor: '#8B5CF6', // violet-500
  },
];

/**
 * カレンダーの日付セル情報
 */
export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  schedules: Schedule[];
}

/**
 * APIレスポンスの型
 */
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * microCMSのレスポンス型
 */
export interface MicroCMSResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}