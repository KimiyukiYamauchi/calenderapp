// components/Schedule/QuickAddModal.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ScheduleInput } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import styles from "./Schedule.module.css";

interface QuickAddModalProps {
  initialDate: Date;
  onClose: () => void;
  onSaved: () => void;
}

export default function QuickAddModal({
  initialDate,
  onClose,
  onSaved,
}: QuickAddModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ScheduleInput>({
    date: formatDate(initialDate),
    startTime: "09:00",
    endTime: "10:00",
    title: "",
    description: "",
    category: "other",
    color: CATEGORIES[3].defaultColor,
    completed: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("タイトルを入力してください");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        onSaved();
      } else {
        alert(data.error || "保存に失敗しました");
      }
    } catch (error) {
      console.error("Failed to save schedule:", error);
      alert("保存中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          maxWidth: "500px",
          width: "90%",
          maxHeight: "90vh",
          overflow: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          style={{ marginBottom: "20px", fontSize: "20px", fontWeight: "600" }}
        >
          予定を追加 - {formatDate(initialDate)}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "600",
              }}
            >
              タイトル<span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className={styles.input}
              placeholder="予定のタイトル"
              autoFocus
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "600",
                }}
              >
                開始時間
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    startTime: e.target.value,
                  }))
                }
                className={styles.input}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "600",
                }}
              >
                終了時間
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, endTime: e.target.value }))
                }
                className={styles.input}
              />
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "600",
              }}
            >
              カテゴリー
            </label>
            <select
              value={formData.category}
              onChange={(e) => {
                const category = CATEGORIES.find(
                  (c) => c.value === e.target.value
                );
                setFormData((prev) => ({
                  ...prev,
                  category: e.target.value as any,
                  color: category?.defaultColor || prev.color,
                }));
              }}
              className={styles.select}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}
          >
            <button
              type="button"
              onClick={onClose}
              className={`${styles.button} ${styles.buttonSecondary}`}
              disabled={loading}
            >
              キャンセル
            </button>
            <button
              type="submit"
              className={`${styles.button} ${styles.buttonPrimary}`}
              disabled={loading}
            >
              {loading ? "保存中..." : "保存"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
