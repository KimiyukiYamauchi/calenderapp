"use client";

import { useEffect, useState } from "react";
import type { Schedule } from "@/lib/types";
import styles from "../Schedule/Schedule.module.css";

const DEFAULT_TITLE = "(無題)";

type Grouped = {
  title: string;
  items: Schedule[];
};

function sortSchedules(a: Schedule, b: Schedule) {
  // 日付＋開始時刻で昇順ソート
  return (a.date + a.startTime).localeCompare(b.date + b.startTime);
}

function groupByTitle(schedules: Schedule[]): Grouped[] {
  const map = new Map<string, Schedule[]>();
  for (const s of schedules) {
    const key = s.title || DEFAULT_TITLE;
    const arr = map.get(key) || [];
    arr.push(s);
    map.set(key, arr);
  }

  const grouped: Grouped[] = Array.from(map.entries()).map(
    ([title, items]) => ({ title, items: items.sort(sortSchedules) })
  );

  // 件数が多い順にソート
  return grouped.sort((a, b) => b.items.length - a.items.length);
}

export default function ScheduleList() {
  const [groups, setGroups] = useState<Grouped[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSchedules();
  }, []);

  async function fetchSchedules() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/schedules");
      const data = await res.json();
      if (!data?.success) {
        setError(data?.error || "予定の取得に失敗しました");
        setGroups([]);
        return;
      }

      const schedules: Schedule[] = data.data || [];
      setGroups(groupByTitle(schedules));
    } catch (err) {
      console.error(err);
      setError("予定一覧の取得中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className={styles.empty}>読み込み中...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.list}>
      <div className={styles.listHeader}>
        <h2 className={styles.listTitle}>予定一覧（タイトル別）</h2>
      </div>

      {groups.length === 0 ? (
        <div className={styles.empty}>予定がありません</div>
      ) : (
        <div className={styles.scheduleItems}>
          {groups.map((g) => (
            <article key={g.title} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  {g.title}
                  <div className={styles.cardMeta}>
                    <span>{g.items.length} 件</span>
                  </div>
                </div>
              </div>

              <ul>
                {g.items.map((s) => (
                  <li key={s.id}>
                    <div className={styles.cardMeta}>
                      <span>
                        {s.date} {s.startTime}
                        {s.endTime ? ` - ${s.endTime}` : ""}
                      </span>
                    </div>
                    <div className={styles.cardDescription}>
                      {s.title ? "" : "（タイトルなし）"}
                      {s.description || ""}
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
