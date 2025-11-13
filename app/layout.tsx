// app/layout.tsx

import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "月間予定管理アプリ",
  description: "画像読み込みと手入力に対応した予定管理アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <header className="header">
          <div className="header-container">
            <Link href="/" className="header-title">
              📅 予定管理
            </Link>
            <nav className="header-nav">
              <Link href="/" className="header-link">
                カレンダー
              </Link>
              <Link href="/schedules" className="header-link">
                予定一覧
              </Link>
              {/* 新規作成ページはモーダルや画像アップロードに統合したためリンクを削除 */}
              <Link href="/schedules/upload" className="header-link">
                画像アップロード
              </Link>
            </nav>
          </div>
        </header>

        <main className="main">{children}</main>

        <footer className="footer">
          <p>© 2025 月間予定管理アプリ. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
