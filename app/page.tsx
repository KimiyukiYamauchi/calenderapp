export const dynamic = "force-dynamic"; // Vercel Edgeで動的レンダリングを有効化

import { Suspense } from "react";
import Calendar from "@/components/Calendar/Calendar";

export default function HomePage() {
  return (
    <div className="page-home">
      <h1>月間予定管理アプリ</h1>

      <Suspense>
        <Calendar />
      </Suspense>
    </div>
  );
}
