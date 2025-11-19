(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/calenderapp/lib/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/types.ts
/**
 * カテゴリーの型
 */ __turbopack_context__.s([
    "CATEGORIES",
    ()=>CATEGORIES
]);
const CATEGORIES = [
    {
        value: "work",
        label: "仕事",
        defaultColor: "#3B82F6"
    },
    {
        value: "private",
        label: "プライベート",
        defaultColor: "#10B981"
    },
    {
        value: "event",
        label: "イベント",
        defaultColor: "#F59E0B"
    },
    {
        value: "other",
        label: "その他",
        defaultColor: "#8B5CF6"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/calenderapp/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/utils.ts
__turbopack_context__.s([
    "combineDateAndTime",
    ()=>combineDateAndTime,
    "fileToBase64",
    ()=>fileToBase64,
    "formatDate",
    ()=>formatDate,
    "formatTime",
    ()=>formatTime,
    "generateCalendarDays",
    ()=>generateCalendarDays,
    "getBase64Data",
    ()=>getBase64Data,
    "getDayName",
    ()=>getDayName,
    "getMimeTypeFromBase64",
    ()=>getMimeTypeFromBase64,
    "getMonthName",
    ()=>getMonthName,
    "getSchedulesForDate",
    ()=>getSchedulesForDate,
    "isLightColor",
    ()=>isLightColor,
    "isValidDate",
    ()=>isValidDate,
    "isValidTime",
    ()=>isValidTime,
    "isValidTimeRange",
    ()=>isValidTimeRange,
    "parseDate",
    ()=>parseDate
]);
function generateCalendarDays(year, month, schedules) {
    const days = [];
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // 月の最初の週の前の月の日付を追加
    const firstDayOfWeek = firstDay.getDay();
    const prevMonthLastDay = new Date(year, month - 1, 0).getDate();
    for(let i = firstDayOfWeek - 1; i >= 0; i--){
        const date = new Date(year, month - 2, prevMonthLastDay - i);
        days.push({
            date,
            isCurrentMonth: false,
            isToday: false,
            schedules: getSchedulesForDate(date, schedules)
        });
    }
    // 当月の日付を追加
    for(let day = 1; day <= lastDay.getDate(); day++){
        const date = new Date(year, month - 1, day);
        const dateOnly = new Date(date);
        dateOnly.setHours(0, 0, 0, 0);
        days.push({
            date,
            isCurrentMonth: true,
            isToday: dateOnly.getTime() === today.getTime(),
            schedules: getSchedulesForDate(date, schedules)
        });
    }
    // 月の最後の週の次の月の日付を追加
    const remainingDays = 7 - days.length % 7;
    if (remainingDays < 7) {
        for(let day = 1; day <= remainingDays; day++){
            const date = new Date(year, month, day);
            days.push({
                date,
                isCurrentMonth: false,
                isToday: false,
                schedules: getSchedulesForDate(date, schedules)
            });
        }
    }
    return days;
}
function getSchedulesForDate(date, schedules) {
    const dateStr = formatDate(date);
    return schedules.filter((schedule)=>schedule.date === dateStr).sort((a, b)=>a.startTime.localeCompare(b.startTime));
}
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
function parseDate(dateStr) {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
}
function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
}
function combineDateAndTime(dateStr, timeStr) {
    const [year, month, day] = dateStr.split("-").map(Number);
    const [hours, minutes] = timeStr.split(":").map(Number);
    return new Date(year, month - 1, day, hours, minutes);
}
function getMonthName(year, month) {
    return `${year}年${month}月`;
}
function getDayName(dayIndex) {
    const days = [
        "日",
        "月",
        "火",
        "水",
        "木",
        "金",
        "土"
    ];
    return days[dayIndex];
}
function isLightColor(hexColor) {
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
}
function fileToBase64(file) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ()=>{
            if (typeof reader.result === "string") {
                resolve(reader.result);
            } else {
                reject(new Error("Failed to convert file to base64"));
            }
        };
        reader.onerror = (error)=>reject(error);
    });
}
function getMimeTypeFromBase64(base64) {
    const match = base64.match(/data:([^;]+);/);
    return match ? match[1] : "image/jpeg";
}
function getBase64Data(base64) {
    return base64.split(",")[1] || base64;
}
function isValidDate(dateStr) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateStr)) return false;
    const date = parseDate(dateStr);
    return !isNaN(date.getTime());
}
function isValidTime(timeStr) {
    const regex = /^\d{2}:\d{2}$/;
    if (!regex.test(timeStr)) return false;
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
}
function isValidTimeRange(startTime, endTime) {
    return startTime < endTime;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/calenderapp/components/ImageUpload/ImageUpload.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "button": "ImageUpload-module__5r8nlq__button",
  "buttonPrimary": "ImageUpload-module__5r8nlq__buttonPrimary",
  "buttonSecondary": "ImageUpload-module__5r8nlq__buttonSecondary",
  "container": "ImageUpload-module__5r8nlq__container",
  "dragOver": "ImageUpload-module__5r8nlq__dragOver",
  "error": "ImageUpload-module__5r8nlq__error",
  "fileInput": "ImageUpload-module__5r8nlq__fileInput",
  "loading": "ImageUpload-module__5r8nlq__loading",
  "loadingSpinner": "ImageUpload-module__5r8nlq__loadingSpinner",
  "loadingText": "ImageUpload-module__5r8nlq__loadingText",
  "preview": "ImageUpload-module__5r8nlq__preview",
  "previewActions": "ImageUpload-module__5r8nlq__previewActions",
  "previewImage": "ImageUpload-module__5r8nlq__previewImage",
  "resultItem": "ImageUpload-module__5r8nlq__resultItem",
  "resultItemBadge": "ImageUpload-module__5r8nlq__resultItemBadge",
  "resultItemField": "ImageUpload-module__5r8nlq__resultItemField",
  "resultItemHeader": "ImageUpload-module__5r8nlq__resultItemHeader",
  "resultItemInput": "ImageUpload-module__5r8nlq__resultItemInput",
  "resultItemLabel": "ImageUpload-module__5r8nlq__resultItemLabel",
  "resultItemRow": "ImageUpload-module__5r8nlq__resultItemRow",
  "resultItemSelect": "ImageUpload-module__5r8nlq__resultItemSelect",
  "resultItemTextarea": "ImageUpload-module__5r8nlq__resultItemTextarea",
  "resultItemTitle": "ImageUpload-module__5r8nlq__resultItemTitle",
  "resultItemValue": "ImageUpload-module__5r8nlq__resultItemValue",
  "results": "ImageUpload-module__5r8nlq__results",
  "resultsCount": "ImageUpload-module__5r8nlq__resultsCount",
  "resultsHeader": "ImageUpload-module__5r8nlq__resultsHeader",
  "resultsList": "ImageUpload-module__5r8nlq__resultsList",
  "resultsTitle": "ImageUpload-module__5r8nlq__resultsTitle",
  "saveButtons": "ImageUpload-module__5r8nlq__saveButtons",
  "spin": "ImageUpload-module__5r8nlq__spin",
  "success": "ImageUpload-module__5r8nlq__success",
  "title": "ImageUpload-module__5r8nlq__title",
  "uploadArea": "ImageUpload-module__5r8nlq__uploadArea",
  "uploadHint": "ImageUpload-module__5r8nlq__uploadHint",
  "uploadIcon": "ImageUpload-module__5r8nlq__uploadIcon",
  "uploadText": "ImageUpload-module__5r8nlq__uploadText",
});
}),
"[project]/calenderapp/components/ImageUpload/ImageUpload.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/ImageUpload/ImageUpload.tsx
__turbopack_context__.s([
    "default",
    ()=>ImageUpload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calenderapp/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calenderapp/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calenderapp/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calenderapp/lib/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calenderapp/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/calenderapp/components/ImageUpload/ImageUpload.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function ImageUpload() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [selectedFile, setSelectedFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [previewUrl, setPreviewUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [personName, setPersonName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [dragOver, setDragOver] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [ocrResults, setOcrResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [editedResults, setEditedResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleFileSelect = (file)=>{
        if (!file.type.startsWith("image/")) {
            alert("画像ファイルを選択してください");
            return;
        }
        setSelectedFile(file);
        setError(null);
        setSuccess(false);
        const reader = new FileReader();
        reader.onload = (e)=>{
            setPreviewUrl(e.target?.result);
        };
        reader.readAsDataURL(file);
    };
    const handleFileInputChange = (e)=>{
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };
    const handleDragOver = (e)=>{
        e.preventDefault();
        setDragOver(true);
    };
    const handleDragLeave = ()=>{
        setDragOver(false);
    };
    const handleDrop = (e)=>{
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };
    const handleUploadClick = ()=>{
        fileInputRef.current?.click();
    };
    const handleAnalyze = async ()=>{
        if (!selectedFile || !previewUrl) return;
        try {
            setLoading(true);
            setError(null);
            const formData = new FormData();
            formData.append("image", previewUrl);
            formData.append("name", personName || "");
            const response = await fetch("/api/ocr", {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            if (data.success && data.data) {
                setOcrResults(data.data);
                // OCR結果を編集可能な形式に変換
                const today = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(new Date());
                const schedules = data.data.map((result)=>{
                    const category = __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORIES"].find((c)=>c.value === result.category);
                    return {
                        date: result.date || today,
                        startTime: result.startTime || "09:00",
                        endTime: result.endTime || "10:00",
                        title: result.title,
                        description: result.description || "",
                        category: result.category || "other",
                        color: category?.defaultColor || __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORIES"][3].defaultColor,
                        completed: false
                    };
                });
                // クライアント側でも指定名でフィルタをかける（サーバーが返さなかった場合のフォールバック）
                const normalize = (s)=>(s || "").normalize("NFKC").toLowerCase().replace(/\s+/g, "").replace(/[\p{P}\p{S}]/gu, "");
                const levenshtein = (a, b)=>{
                    const dp = Array.from({
                        length: a.length + 1
                    }, ()=>new Array(b.length + 1).fill(0));
                    for(let i = 0; i <= a.length; i++)dp[i][0] = i;
                    for(let j = 0; j <= b.length; j++)dp[0][j] = j;
                    for(let i = 1; i <= a.length; i++){
                        for(let j = 1; j <= b.length; j++){
                            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                            dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
                        }
                    }
                    return dp[a.length][b.length];
                };
                let filteredSchedules = schedules;
                if (personName && personName.trim()) {
                    const nm = normalize(personName.trim());
                    const matchesName = (result, raw)=>{
                        // try assignedTo/rawText if available in OCR results
                        const ocr = raw;
                        if (ocr?.assignedTo && ocr.assignedTo.length > 0) {
                            for (const p of ocr.assignedTo){
                                const pn = normalize(p);
                                if (!pn) continue;
                                if (pn.includes(nm) || nm.includes(pn)) return true;
                                const maxDist = Math.max(1, Math.floor(Math.max(nm.length, pn.length) * 0.3));
                                if (levenshtein(pn, nm) <= maxDist) return true;
                            }
                            return false;
                        }
                        const fields = [
                            result.title,
                            result.description,
                            ocr && ocr.rawText || ""
                        ].filter(Boolean).map((s)=>normalize(String(s)));
                        for (const f of fields){
                            if (f.includes(nm) || nm.includes(f)) return true;
                            if (levenshtein(f, nm) <= Math.max(1, Math.floor(nm.length * 0.25))) return true;
                        }
                        return false;
                    };
                    // map back OCR results to schedule inputs to filter with raw data if present
                    filteredSchedules = schedules.filter((s, idx)=>matchesName(s, data.data[idx]));
                }
                setEditedResults(filteredSchedules);
                // 自動保存：該当名の予定が見つかったら即保存してカレンダーへ遷移
                if (filteredSchedules.length > 0) {
                    try {
                        setLoading(true);
                        const resp = await fetch("/api/schedules", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(filteredSchedules)
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
                    } finally{
                        setLoading(false);
                    }
                }
            } else {
                setError(data.error || "予定の抽出に失敗しました");
            }
        } catch (err) {
            console.error("OCR error:", err);
            setError("OCR処理中にエラーが発生しました");
        } finally{
            setLoading(false);
        }
    };
    // If no name provided, require user to input before analyzing
    const canAnalyze = !!personName.trim() && !!selectedFile && !!previewUrl;
    const handleResultChange = (index, field, value)=>{
        setEditedResults((prev)=>{
            const updated = [
                ...prev
            ];
            updated[index] = {
                ...updated[index],
                [field]: value
            };
            // カテゴリー変更時に色も更新
            if (field === "category") {
                const category = __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORIES"].find((c)=>c.value === value);
                if (category) {
                    updated[index].color = category.defaultColor;
                }
            }
            return updated;
        });
    };
    const handleSave = async ()=>{
        if (editedResults.length === 0) return;
        // バリデーション
        const hasError = editedResults.some((result)=>!result.title.trim() || !result.date || !result.startTime || !result.endTime);
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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editedResults)
            });
            const data = await response.json();
            if (data.success) {
                setSuccess(true);
                setTimeout(()=>{
                    router.push("/schedules");
                    router.refresh();
                }, 1500);
            } else {
                setError(data.error || "保存に失敗しました");
            }
        } catch (err) {
            console.error("Save error:", err);
            setError("保存中にエラーが発生しました");
        } finally{
            setLoading(false);
        }
    };
    const handleReset = ()=>{
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                children: "画像から予定を読み込む"
            }, void 0, false, {
                fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                lineNumber: 309,
                columnNumber: 7
            }, this),
            !selectedFile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].uploadArea} ${dragOver ? __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dragOver : ""}`,
                        onClick: handleUploadClick,
                        onDragOver: handleDragOver,
                        onDragLeave: handleDragLeave,
                        onDrop: handleDrop,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].uploadIcon,
                                children: "📷"
                            }, void 0, false, {
                                fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                lineNumber: 322,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].uploadText,
                                children: "クリックまたはドラッグ＆ドロップで画像をアップロード"
                            }, void 0, false, {
                                fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                lineNumber: 323,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].uploadHint,
                                children: "カレンダーや手帳の写真から予定を自動抽出します"
                            }, void 0, false, {
                                fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                lineNumber: 326,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                        lineNumber: 313,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: fileInputRef,
                        type: "file",
                        accept: "image/*",
                        onChange: handleFileInputChange,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fileInput
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                        lineNumber: 330,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 12
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        style: {
                            display: "block",
                            marginBottom: 6
                        },
                        children: "名前（抽出対象）"
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                        lineNumber: 342,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: personName,
                        onChange: (e)=>setPersonName(e.target.value),
                        placeholder: "例: 田中 太郎",
                        style: {
                            padding: 8,
                            width: "100%",
                            maxWidth: 360
                        }
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                        lineNumber: 345,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                lineNumber: 341,
                columnNumber: 7
            }, this),
            selectedFile && previewUrl && !loading && editedResults.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].preview,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: previewUrl,
                        alt: "Preview",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].previewImage
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                        lineNumber: 356,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].previewActions,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].button} ${__TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buttonSecondary}`,
                                onClick: handleReset,
                                children: "別の画像を選択"
                            }, void 0, false, {
                                fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                lineNumber: 358,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].button} ${__TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buttonPrimary}`,
                                onClick: handleAnalyze,
                                disabled: !canAnalyze,
                                title: !canAnalyze ? "画像と抽出対象の名前を指定してください" : "予定を抽出",
                                children: "予定を抽出"
                            }, void 0, false, {
                                fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                lineNumber: 364,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                        lineNumber: 357,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                lineNumber: 355,
                columnNumber: 9
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loading,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loadingSpinner
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                        lineNumber: 382,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loadingText,
                        children: editedResults.length === 0 ? "画像を解析中..." : "予定を保存中..."
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                        lineNumber: 383,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                lineNumber: 381,
                columnNumber: 9
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].error,
                children: error
            }, void 0, false, {
                fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                lineNumber: 389,
                columnNumber: 17
            }, this),
            success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].success,
                children: "予定を保存しました！予定一覧ページに移動します..."
            }, void 0, false, {
                fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                lineNumber: 392,
                columnNumber: 9
            }, this),
            editedResults.length > 0 && !success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].results,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultsHeader,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultsTitle,
                                children: "抽出された予定"
                            }, void 0, false, {
                                fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                lineNumber: 400,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultsCount,
                                children: [
                                    editedResults.length,
                                    "件の予定が見つかりました"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                lineNumber: 401,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                        lineNumber: 399,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultsList,
                        children: editedResults.map((result, index)=>{
                            const category = __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORIES"].find((c)=>c.value === result.category);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultItemHeader,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: result.title,
                                                onChange: (e)=>handleResultChange(index, "title", e.target.value),
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultItemTitle,
                                                style: {
                                                    border: "none",
                                                    outline: "none",
                                                    width: "100%"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                                lineNumber: 414,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultItemBadge,
                                                style: {
                                                    backgroundColor: result.color
                                                },
                                                children: category?.label
                                            }, void 0, false, {
                                                fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                                lineNumber: 423,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                        lineNumber: 413,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultItemRow,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultItemField,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultItemLabel,
                                                        children: "日付"
                                                    }, void 0, false, {
                                                        fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                                        lineNumber: 433,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "date",
                                                        value: result.date,
                                                        onChange: (e)=>handleResultChange(index, "date", e.target.value),
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultItemInput
                                                    }, void 0, false, {
                                                        fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                                        lineNumber: 434,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                                lineNumber: 432,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultItemField,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultItemLabel,
                                                        children: "開始時間"
                                                    }, void 0, false, {
                                                        fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                                        lineNumber: 445,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "time",
                                                        value: result.startTime,
                                                        onChange: (e)=>handleResultChange(index, "startTime", e.target.value),
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultItemInput
                                                    }, void 0, false, {
                                                        fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                                        lineNumber: 446,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                                lineNumber: 444,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultItemField,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultItemLabel,
                                                        children: "終了時間"
                                                    }, void 0, false, {
                                                        fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                                        lineNumber: 457,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "time",
                                                        value: result.endTime,
                                                        onChange: (e)=>handleResultChange(index, "endTime", e.target.value),
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultItemInput
                                                    }, void 0, false, {
                                                        fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                                        lineNumber: 458,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                                lineNumber: 456,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultItemField,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultItemLabel,
                                                        children: "カテゴリー"
                                                    }, void 0, false, {
                                                        fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                                        lineNumber: 469,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: result.category,
                                                        onChange: (e)=>handleResultChange(index, "category", e.target.value),
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultItemSelect,
                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORIES"].map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: cat.value,
                                                                children: cat.label
                                                            }, cat.value, false, {
                                                                fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                                                lineNumber: 484,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                                        lineNumber: 472,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                                lineNumber: 468,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                        lineNumber: 431,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultItemField,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultItemLabel,
                                                children: "詳細"
                                            }, void 0, false, {
                                                fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                                lineNumber: 493,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: result.description,
                                                onChange: (e)=>handleResultChange(index, "description", e.target.value),
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultItemTextarea,
                                                placeholder: "予定の詳細..."
                                            }, void 0, false, {
                                                fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                                lineNumber: 494,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                        lineNumber: 492,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                lineNumber: 412,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                        lineNumber: 406,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].saveButtons,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].button} ${__TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buttonSecondary}`,
                                onClick: handleReset,
                                disabled: loading,
                                children: "キャンセル"
                            }, void 0, false, {
                                fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                lineNumber: 509,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].button} ${__TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$ImageUpload$2f$ImageUpload$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buttonPrimary}`,
                                onClick: handleSave,
                                disabled: loading,
                                children: "すべて保存"
                            }, void 0, false, {
                                fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                                lineNumber: 516,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                        lineNumber: 508,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
                lineNumber: 398,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/calenderapp/components/ImageUpload/ImageUpload.tsx",
        lineNumber: 308,
        columnNumber: 5
    }, this);
}
_s(ImageUpload, "7awFV2i1dIhLA52QoOBOu/PEO6M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ImageUpload;
var _c;
__turbopack_context__.k.register(_c, "ImageUpload");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/calenderapp/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/calenderapp/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/calenderapp/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/calenderapp/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/calenderapp/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/calenderapp/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/calenderapp/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/calenderapp/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=calenderapp_17ebdeba._.js.map