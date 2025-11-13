// app/page.tsx

import Calendar from "@/components/Calendar/Calendar";

export default function HomePage() {
  return (
    <div className="page-home">
      <h1>月間予定管理アプリ</h1>
      <Calendar />
    </div>
  );
}
