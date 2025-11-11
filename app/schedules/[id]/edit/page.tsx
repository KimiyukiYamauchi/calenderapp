// app/schedules/[id]/edit/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ScheduleForm from '@/components/Schedule/ScheduleForm';
import type { Schedule } from '@/lib/types';

export default function EditSchedulePage() {
  const params = useParams();
  const router = useRouter();
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSchedule();
  }, [params.id]);

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/schedules/${params.id}`);
      const data = await response.json();

      if (data.success) {
        setSchedule(data.data);
      } else {
        setError(data.error || '予定の取得に失敗しました');
      }
    } catch (err) {
      setError('予定の取得中にエラーが発生しました');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    router.push(`/schedules/${params.id}`);
    router.refresh();
  };

  const handleCancel = () => {
    router.push(`/schedules/${params.id}`);
  };

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
          読み込み中...
        </div>
      </div>
    );
  }

  if (error || !schedule) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '40px', color: '#ef4444' }}>
          {error || '予定が見つかりません'}
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link href="/schedules" className="btn btn-secondary">
            予定一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">予定を編集</h1>
      <ScheduleForm
        schedule={schedule}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
}