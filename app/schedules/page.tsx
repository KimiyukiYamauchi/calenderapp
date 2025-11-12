import Link from "next/link";

export default function SchedulesPage() {
  return (
    <div>
      <h1>予定一覧</h1>
      <p>ここに予定の一覧を表示します。</p>
      <Link href="/schedules/new">新規作成</Link>
    </div>
  );
}
