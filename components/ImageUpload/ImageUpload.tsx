// components/ImageUpload/ImageUpload.tsx

"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { OCRResult, Category, ScheduleInput } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import styles from "./ImageUpload.module.css";

export default function ImageUpload() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [personName, setPersonName] = useState<string>("");
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ocrResults, setOcrResults] = useState<OCRResult[]>([]);
  const [editedResults, setEditedResults] = useState<ScheduleInput[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("画像ファイルを選択してください");
      return;
    }

    setSelectedFile(file);
    setError(null);
    setSuccess(false);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !previewUrl) return;

    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("image", previewUrl);
      formData.append("name", personName || "");

      const response = await fetch("/api/ocr", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.data) {
        setOcrResults(data.data);

        // OCR結果を編集可能な形式に変換
        const today = formatDate(new Date());
        const schedules: ScheduleInput[] = data.data.map(
          (result: OCRResult) => {
            const category = CATEGORIES.find(
              (c) => c.value === result.category
            );
            return {
              date: result.date || today,
              startTime: result.startTime || "09:00",
              endTime: result.endTime || "10:00",
              title: result.title,
              description: result.description || "",
              category: result.category || "other",
              color: category?.defaultColor || CATEGORIES[3].defaultColor,
              completed: false,
            };
          }
        );

        // クライアント側でも指定名でフィルタをかける（サーバーが返さなかった場合のフォールバック）
        const normalize = (s?: string) =>
          (s || "")
            .normalize("NFKC")
            .toLowerCase()
            .replace(/\s+/g, "")
            .replace(/[\p{P}\p{S}]/gu, "");

        const levenshtein = (a: string, b: string) => {
          const dp: number[][] = Array.from({ length: a.length + 1 }, () =>
            new Array(b.length + 1).fill(0)
          );
          for (let i = 0; i <= a.length; i++) dp[i][0] = i;
          for (let j = 0; j <= b.length; j++) dp[0][j] = j;
          for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
              const cost = a[i - 1] === b[j - 1] ? 0 : 1;
              dp[i][j] = Math.min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + cost
              );
            }
          }
          return dp[a.length][b.length];
        };

        let filteredSchedules = schedules;
        if (personName && personName.trim()) {
          const nm = normalize(personName.trim());
          const matchesName = (result: ScheduleInput, raw?: OCRResult) => {
            // try assignedTo/rawText if available in OCR results
            const ocr = raw as OCRResult | undefined;
            if (ocr?.assignedTo && ocr.assignedTo.length > 0) {
              for (const p of ocr.assignedTo) {
                const pn = normalize(p);
                if (!pn) continue;
                if (pn.includes(nm) || nm.includes(pn)) return true;
                const maxDist = Math.max(
                  1,
                  Math.floor(Math.max(nm.length, pn.length) * 0.3)
                );
                if (levenshtein(pn, nm) <= maxDist) return true;
              }
              return false;
            }

            const fields = [
              result.title,
              result.description,
              (ocr && ocr.rawText) || "",
            ]
              .filter(Boolean)
              .map((s) => normalize(String(s)));
            for (const f of fields) {
              if (f.includes(nm) || nm.includes(f)) return true;
              if (
                levenshtein(f, nm) <= Math.max(1, Math.floor(nm.length * 0.25))
              )
                return true;
            }
            return false;
          };

          // map back OCR results to schedule inputs to filter with raw data if present
          filteredSchedules = schedules.filter((s, idx) =>
            matchesName(s, data.data[idx])
          );
        }

        setEditedResults(filteredSchedules);

        // 自動保存：該当名の予定が見つかったら即保存してカレンダーへ遷移
        if (filteredSchedules.length > 0) {
          try {
            setLoading(true);
            const resp = await fetch("/api/schedules", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(filteredSchedules),
            });
            const resData = await resp.json();
            if (resData.success) {
              // 移動先は最初の予定の日付
              const targetDate = filteredSchedules[0].date;
              // ルートに focus クエリで移動
              router.push(`/?focus=${encodeURIComponent(targetDate)}`);
              router.refresh();
              return;
            } else {
              setError(resData.error || "自動保存に失敗しました");
            }
          } catch (err) {
            console.error("Auto-save error:", err);
            setError("自動保存中にエラーが発生しました");
          } finally {
            setLoading(false);
          }
        }
      } else {
        setError(data.error || "予定の抽出に失敗しました");
      }
    } catch (err) {
      console.error("OCR error:", err);
      setError("OCR処理中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  // If no name provided, require user to input before analyzing
  const canAnalyze = !!personName.trim() && !!selectedFile && !!previewUrl;

  const handleResultChange = (
    index: number,
    field: keyof ScheduleInput,
    value: string | boolean
  ) => {
    setEditedResults((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };

      // カテゴリー変更時に色も更新
      if (field === "category") {
        const category = CATEGORIES.find((c) => c.value === value);
        if (category) {
          updated[index].color = category.defaultColor;
        }
      }

      return updated;
    });
  };

  const handleSave = async () => {
    if (editedResults.length === 0) return;

    // バリデーション
    const hasError = editedResults.some(
      (result) =>
        !result.title.trim() ||
        !result.date ||
        !result.startTime ||
        !result.endTime
    );

    if (hasError) {
      alert("すべての必須項目を入力してください");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedResults),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/schedules");
          router.refresh();
        }, 1500);
      } else {
        setError(data.error || "保存に失敗しました");
      }
    } catch (err) {
      console.error("Save error:", err);
      setError("保存中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setOcrResults([]);
    setEditedResults([]);
    setError(null);
    setSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>画像から予定を読み込む</h1>

      {!selectedFile && (
        <>
          <div
            className={`${styles.uploadArea} ${
              dragOver ? styles.dragOver : ""
            }`}
            onClick={handleUploadClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className={styles.uploadIcon}>📷</div>
            <div className={styles.uploadText}>
              クリックまたはドラッグ＆ドロップで画像をアップロード
            </div>
            <div className={styles.uploadHint}>
              カレンダーや手帳の写真から予定を自動抽出します
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className={styles.fileInput}
          />
        </>
      )}

      {/* 名前を先に入力してもらう */}
      <div style={{ marginTop: 12 }}>
        <label style={{ display: "block", marginBottom: 6 }}>
          名前（抽出対象）
        </label>
        <input
          type="text"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
          placeholder="例: 田中 太郎"
          style={{ padding: 8, width: "100%", maxWidth: 360 }}
        />
      </div>

      {selectedFile && previewUrl && !loading && editedResults.length === 0 && (
        <div className={styles.preview}>
          <img src={previewUrl} alt="Preview" className={styles.previewImage} />
          <div className={styles.previewActions}>
            <button
              className={`${styles.button} ${styles.buttonSecondary}`}
              onClick={handleReset}
            >
              別の画像を選択
            </button>
            <button
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={handleAnalyze}
              disabled={!canAnalyze}
              title={
                !canAnalyze
                  ? "画像と抽出対象の名前を指定してください"
                  : "予定を抽出"
              }
            >
              予定を抽出
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <div className={styles.loadingText}>
            {editedResults.length === 0 ? "画像を解析中..." : "予定を保存中..."}
          </div>
        </div>
      )}

      {error && <div className={styles.error}>{error}</div>}

      {success && (
        <div className={styles.success}>
          予定を保存しました！予定一覧ページに移動します...
        </div>
      )}

      {editedResults.length > 0 && !success && (
        <div className={styles.results}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>抽出された予定</h2>
            <p className={styles.resultsCount}>
              {editedResults.length}件の予定が見つかりました
            </p>
          </div>

          <div className={styles.resultsList}>
            {editedResults.map((result, index) => {
              const category = CATEGORIES.find(
                (c) => c.value === result.category
              );
              return (
                <div key={index} className={styles.resultItem}>
                  <div className={styles.resultItemHeader}>
                    <input
                      type="text"
                      value={result.title}
                      onChange={(e) =>
                        handleResultChange(index, "title", e.target.value)
                      }
                      className={styles.resultItemTitle}
                      style={{ border: "none", outline: "none", width: "100%" }}
                    />
                    <span
                      className={styles.resultItemBadge}
                      style={{ backgroundColor: result.color }}
                    >
                      {category?.label}
                    </span>
                  </div>

                  <div className={styles.resultItemRow}>
                    <div className={styles.resultItemField}>
                      <label className={styles.resultItemLabel}>日付</label>
                      <input
                        type="date"
                        value={result.date}
                        onChange={(e) =>
                          handleResultChange(index, "date", e.target.value)
                        }
                        className={styles.resultItemInput}
                      />
                    </div>

                    <div className={styles.resultItemField}>
                      <label className={styles.resultItemLabel}>開始時間</label>
                      <input
                        type="time"
                        value={result.startTime}
                        onChange={(e) =>
                          handleResultChange(index, "startTime", e.target.value)
                        }
                        className={styles.resultItemInput}
                      />
                    </div>

                    <div className={styles.resultItemField}>
                      <label className={styles.resultItemLabel}>終了時間</label>
                      <input
                        type="time"
                        value={result.endTime}
                        onChange={(e) =>
                          handleResultChange(index, "endTime", e.target.value)
                        }
                        className={styles.resultItemInput}
                      />
                    </div>

                    <div className={styles.resultItemField}>
                      <label className={styles.resultItemLabel}>
                        カテゴリー
                      </label>
                      <select
                        value={result.category}
                        onChange={(e) =>
                          handleResultChange(
                            index,
                            "category",
                            e.target.value as Category
                          )
                        }
                        className={styles.resultItemSelect}
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={styles.resultItemField}>
                    <label className={styles.resultItemLabel}>詳細</label>
                    <textarea
                      value={result.description}
                      onChange={(e) =>
                        handleResultChange(index, "description", e.target.value)
                      }
                      className={styles.resultItemTextarea}
                      placeholder="予定の詳細..."
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.saveButtons}>
            <button
              className={`${styles.button} ${styles.buttonSecondary}`}
              onClick={handleReset}
              disabled={loading}
            >
              キャンセル
            </button>
            <button
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={handleSave}
              disabled={loading}
            >
              すべて保存
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
