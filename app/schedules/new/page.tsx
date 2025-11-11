
// app/schedules/new/page.tsx

'use client';

import { useSearchParams } from 'next/navigation';
import ScheduleForm from '@/components/Schedule/ScheduleForm';
import { parseDate } from '@/lib/utils';

export default function NewSchedulePage() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');
  const initialDate = dateParam ? parseDate(dateParam) : new Date();

  return (
    <div className="container">
      <h1 className="page-title">新しい予定を作成</h1>
      <ScheduleForm initialDate={initialDate} />
    </div>
  );
}