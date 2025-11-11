// components/ImageUpload/ImageUpload.tsx

'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { OCRResult, Category, ScheduleInput } from '@/lib/types';
import { CATEGORIES } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import styles from './ImageUpload.module.css';

export default function ImageUpload() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ocrResults, setOcrResults] = useState<OCRResult[]>([]);
  const [editedResults, setEditedResults] = useState<ScheduleInput[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('画像ファイルを選択してください');
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
      formData.append('image', previewUrl);

      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.data) {
        setOcrResults(data.data);

        // OCR結果を編集可能な形式に変換
        const today = formatDate(new Date());
        const schedules: ScheduleInput[] = data.data.map((result: OCRResult) => {
          const category = CATEGORIES.find((c) => c.value === result.category);
          return {
            date: result.date || today,
            startTime: result.startTime || '09:00',
            endTime: result.endTime || '10:00',
            title: result.title,
            description: result.description || '',
            category: result.category || 'other',
            color: category?.defaultColor || CATEGORIES[3].defaultColor,
            completed: false,
          };
        });

        setEditedResults(schedules);
      } else {
        setError(data.error || '予定の抽出に失敗しました');
      }
    } catch (err) {
      console.error('OCR error:', err);
      setError('OCR処理中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const handleResultChange = (
    index: number,
    field: keyof ScheduleInput,
    value: string | boolean
  ) => {
    setEditedResults((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };

      // カテゴリー変更時に色も更新
      if (field === 'category') {
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
      (result) => !result.title.trim() || !result.date || !result.startTime || !result.endTime
    );

    if (hasError) {
      alert('すべての必須項目を入力してください');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/schedules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedResults),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/schedules');
          router.refresh();
        }, 1500);
      } else {
        setError(data.error || '保存に失敗しました');
      }
    } catch (err) {
      console.error('Save error:', err);
      setError('保存中にエラーが発生しました');
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
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>画像から予定を読み込む</h1>

      {!selectedFile && (
        <>
          <div
            className={`${styles.uploadArea} ${dragOver ? styles.dragOver : ''}`}
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
            {editedResults.length === 0
              ? '画像を解析中...'
              : '予定を保存中...'}
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
              const category = CATEGORIES.find((c) => c.value === result.category);
              return (
                <div key={index} className={styles.resultItem}>
                  <div className={styles.resultItemHeader}>
                    <input
                      type="text"
                      value={result.title}
                      onChange={(e) =>
                        handleResultChange(index, 'title', e.target.value)
                      }
                      className={styles.resultItemTitle}
                      style={{ border: 'none', outline: 'none', width: '100%' }}
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
                          handleResultChange(index, 'date', e.target.value)
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
                          handleResultChange(index, 'startTime', e.target.value)
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
                          handleResultChange(index, 'endTime', e.target.value)
                        }
                        className={styles.resultItemInput}
                      />
                    </div>

                    <div className={styles.resultItemField}>
                      <label className={styles.resultItemLabel}>カテゴリー</label>
                      <select
                        value={result.category}
                        onChange={(e) =>
                          handleResultChange(
                            index,
                            'category',
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
                        handleResultChange(index, 'description', e.target.value)
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