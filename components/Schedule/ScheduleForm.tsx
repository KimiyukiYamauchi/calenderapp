// components/Schedule/ScheduleForm.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Schedule, ScheduleInput, Category } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";
import {
  formatDate,
  formatTime,
  isValidDate,
  isValidTime,
  isValidTimeRange,
} from "@/lib/utils";
import styles from "./Schedule.module.css";

interface ScheduleFormProps {
  schedule?: Schedule;
  initialDate?: Date;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ScheduleForm({
  schedule,
  initialDate,
  onSuccess,
  onCancel,
}: ScheduleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<ScheduleInput>({
    date:
      schedule?.date ||
      (initialDate ? formatDate(initialDate) : formatDate(new Date())),
    startTime: schedule?.startTime || "09:00",
    endTime: schedule?.endTime || "10:00",
    title: schedule?.title || "",
    description: schedule?.description || "",
    category: schedule?.category || "other",
    color:
      schedule?.color ||
      CATEGORIES.find((c) => c.value === "other")!.defaultColor,
    completed: schedule?.completed || false,
  });

  // カテゴリー変更時に色を自動設定
  useEffect(() => {
    if (!schedule) {
      const category = CATEGORIES.find((c) => c.value === formData.category);
      if (category) {
        setFormData((prev) => ({ ...prev, color: category.defaultColor }));
      }
    }
  }, [formData.category, schedule]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // エラーをクリア
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleColorSelect = (color: string) => {
    setFormData((prev) => ({ ...prev, color }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "タイトルを入力してください";
    }

    if (!isValidDate(formData.date)) {
      newErrors.date = "有効な日付を入力してください";
    }

    if (!isValidTime(formData.startTime)) {
      newErrors.startTime = "有効な時間を入力してください";
    }

    if (!isValidTime(formData.endTime)) {
      newErrors.endTime = "有効な時間を入力してください";
    }

    if (
      isValidTime(formData.startTime) &&
      isValidTime(formData.endTime) &&
      !isValidTimeRange(formData.startTime, formData.endTime)
    ) {
      newErrors.endTime = "終了時間は開始時間より後にしてください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      const url = schedule ? `/api/schedules/${schedule.id}` : "/api/schedules";
      const method = schedule ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        if (onSuccess) {
          onSuccess();
        } else {
          // after creating/updating, go back to the calendar (root) so the saved
          // schedule is visible immediately
          router.push("/");
          router.refresh();
        }
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

  const handleDelete = async () => {
    if (!schedule) return;

    if (!confirm("この予定を削除しますか？")) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`/api/schedules/${schedule.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        // go back to calendar after delete
        router.push("/");
        router.refresh();
      } else {
        alert(data.error || "削除に失敗しました");
      }
    } catch (error) {
      console.error("Failed to delete schedule:", error);
      alert("削除中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>
          タイトル<span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={styles.input}
          placeholder="予定のタイトル"
        />
        {errors.title && <div className={styles.error}>{errors.title}</div>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="date" className={styles.label}>
          日付<span className={styles.required}>*</span>
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={styles.input}
        />
        {errors.date && <div className={styles.error}>{errors.date}</div>}
      </div>

      <div className={styles.timeRow}>
        <div className={styles.formGroup}>
          <label htmlFor="startTime" className={styles.label}>
            開始時間<span className={styles.required}>*</span>
          </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.startTime && (
            <div className={styles.error}>{errors.startTime}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="endTime" className={styles.label}>
            終了時間<span className={styles.required}>*</span>
          </label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.endTime && (
            <div className={styles.error}>{errors.endTime}</div>
          )}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="category" className={styles.label}>
          カテゴリー
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={styles.select}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>色</label>
        <div className={styles.colorPicker}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.defaultColor}
              type="button"
              className={`${styles.colorOption} ${
                formData.color === cat.defaultColor ? styles.selected : ""
              }`}
              style={{ backgroundColor: cat.defaultColor }}
              onClick={() => handleColorSelect(cat.defaultColor)}
              aria-label={`${cat.label}の色`}
            />
          ))}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>
          詳細
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={styles.textarea}
          placeholder="予定の詳細説明"
        />
      </div>

      <div className={styles.formGroup}>
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
          />
          <label htmlFor="completed" className={styles.label}>
            完了済み
          </label>
        </div>
      </div>

      <div className={styles.buttons}>
        {schedule && (
          <button
            type="button"
            className={`${styles.button} ${styles.buttonDanger}`}
            onClick={handleDelete}
            disabled={loading}
          >
            削除
          </button>
        )}
        {onCancel && (
          <button
            type="button"
            className={`${styles.button} ${styles.buttonSecondary}`}
            onClick={onCancel}
            disabled={loading}
          >
            キャンセル
          </button>
        )}
        <button
          type="submit"
          className={`${styles.button} ${styles.buttonPrimary}`}
          disabled={loading}
        >
          {loading ? "保存中..." : schedule ? "更新" : "作成"}
        </button>
      </div>
    </form>
  );
}
