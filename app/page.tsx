// app/page.tsx

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="page-home">
      <h1>月間予定管理アプリ</h1>
      <p>画像アップロードまたは手入力で予定を管理できます。</p>
      <div style={{ marginTop: 16 }}>
        <Link href="/schedules">予定一覧へ</Link>
        <span style={{ margin: "0 8px" }} />
        <Link href="/schedules/new">新規予定を作成</Link>
      </div>
    </div>
  );
}
