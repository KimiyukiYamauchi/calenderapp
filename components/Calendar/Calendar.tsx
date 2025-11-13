// components/Calendar/Calendar.tsx

"use client";

import { useState, useEffect } from "react";
import type { Schedule, CalendarDay } from "@/lib/types";
import { generateCalendarDays, getMonthName, getDayName } from "@/lib/utils";
import styles from "./Calendar.module.css";

interface CalendarProps {
  onDayClick?: (date: Date, schedules: Schedule[]) => void;
}

export default function Calendar({ onDayClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  // 予定を取得
  useEffect(() => {
    fetchSchedules();
  }, [year, month]);

  // カレンダーデータを生成
  useEffect(() => {
    const days = generateCalendarDays(year, month, schedules);
    setCalendarDays(days);
  }, [year, month, schedules]);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/schedules?year=${year}&month=${month}`
      );
      const data = await response.json();

      if (data.success) {
        setSchedules(data.data || []);
      } else {
        setError(data.error || "予定の取得に失敗しました");
      }
    } catch (err) {
      setError("予定の取得中にエラーが発生しました");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 2, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (day: CalendarDay) => {
    if (onDayClick) {
      onDayClick(day.date, day.schedules);
    }
  };

  if (loading) {
    return <div className={styles.loading}>読み込み中...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.navigation}>
          <button
            className={styles.navButton}
            onClick={handlePrevMonth}
            aria-label="前月"
          >
            ← 前月
          </button>
          <button
            className={styles.navButton}
            onClick={handleNextMonth}
            aria-label="次月"
          >
            次月 →
          </button>
        </div>
        <h2 className={styles.monthTitle}>{getMonthName(year, month)}</h2>
        <button
          className={styles.todayButton}
          onClick={handleToday}
          aria-label="今日"
        >
          今日
        </button>
      </div>

      <div className={styles.calendar}>
        <div className={styles.weekDays}>
          {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => (
            <div
              key={dayIndex}
              className={`${styles.weekDay} ${
                dayIndex === 0
                  ? styles.sunday
                  : dayIndex === 6
                  ? styles.saturday
                  : ""
              }`}
            >
              {getDayName(dayIndex)}
            </div>
          ))}
        </div>

        <div className={styles.days}>
          {calendarDays.map((day, index) => {
            const dayOfWeek = day.date.getDay();
            const isSunday = dayOfWeek === 0;
            const isSaturday = dayOfWeek === 6;

            return (
              <div
                key={index}
                className={`${styles.day} ${
                  !day.isCurrentMonth ? styles.otherMonth : ""
                } ${day.isToday ? styles.today : ""} ${
                  isSunday ? styles.sunday : ""
                } ${isSaturday ? styles.saturday : ""}`}
                onClick={() => handleDayClick(day)}
              >
                <div className={styles.dayNumber}>{day.date.getDate()}</div>

                <div className={styles.scheduleList}>
                  {day.schedules.slice(0, 3).map((schedule) => (
                    <div
                      key={schedule.id}
                      className={styles.scheduleItem}
                      style={{ backgroundColor: schedule.color }}
                      title={`${schedule.startTime} ${schedule.title}`}
                    >
                      {schedule.startTime} {schedule.title}
                    </div>
                  ))}
                  {day.schedules.length > 3 && (
                    <div className={styles.scheduleCount}>
                      他 {day.schedules.length - 3} 件
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
