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
        value: 'work',
        label: '仕事',
        defaultColor: '#3B82F6'
    },
    {
        value: 'private',
        label: 'プライベート',
        defaultColor: '#10B981'
    },
    {
        value: 'event',
        label: 'イベント',
        defaultColor: '#F59E0B'
    },
    {
        value: 'other',
        label: 'その他',
        defaultColor: '#8B5CF6'
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
"[project]/calenderapp/components/Schedule/Schedule.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "button": "Schedule-module__I33aDW__button",
  "buttonDanger": "Schedule-module__I33aDW__buttonDanger",
  "buttonPrimary": "Schedule-module__I33aDW__buttonPrimary",
  "buttonSecondary": "Schedule-module__I33aDW__buttonSecondary",
  "buttons": "Schedule-module__I33aDW__buttons",
  "card": "Schedule-module__I33aDW__card",
  "cardBadge": "Schedule-module__I33aDW__cardBadge",
  "cardCompleted": "Schedule-module__I33aDW__cardCompleted",
  "cardDescription": "Schedule-module__I33aDW__cardDescription",
  "cardHeader": "Schedule-module__I33aDW__cardHeader",
  "cardMeta": "Schedule-module__I33aDW__cardMeta",
  "cardTitle": "Schedule-module__I33aDW__cardTitle",
  "checkbox": "Schedule-module__I33aDW__checkbox",
  "colorOption": "Schedule-module__I33aDW__colorOption",
  "colorPicker": "Schedule-module__I33aDW__colorPicker",
  "empty": "Schedule-module__I33aDW__empty",
  "error": "Schedule-module__I33aDW__error",
  "form": "Schedule-module__I33aDW__form",
  "formGroup": "Schedule-module__I33aDW__formGroup",
  "input": "Schedule-module__I33aDW__input",
  "label": "Schedule-module__I33aDW__label",
  "list": "Schedule-module__I33aDW__list",
  "listHeader": "Schedule-module__I33aDW__listHeader",
  "listTitle": "Schedule-module__I33aDW__listTitle",
  "required": "Schedule-module__I33aDW__required",
  "scheduleItems": "Schedule-module__I33aDW__scheduleItems",
  "select": "Schedule-module__I33aDW__select",
  "selected": "Schedule-module__I33aDW__selected",
  "textarea": "Schedule-module__I33aDW__textarea",
  "timeRow": "Schedule-module__I33aDW__timeRow",
});
}),
"[project]/calenderapp/components/Schedule/ScheduleForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/Schedule/ScheduleForm.tsx
__turbopack_context__.s([
    "default",
    ()=>ScheduleForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calenderapp/lib/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calenderapp/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/calenderapp/components/Schedule/Schedule.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function ScheduleForm({ schedule, initialDate, onSuccess, onCancel }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        date: schedule?.date || (initialDate ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(initialDate) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(new Date())),
        startTime: schedule?.startTime || '09:00',
        endTime: schedule?.endTime || '10:00',
        title: schedule?.title || '',
        description: schedule?.description || '',
        category: schedule?.category || 'other',
        color: schedule?.color || __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORIES"].find({
            "ScheduleForm.useState": (c)=>c.value === 'other'
        }["ScheduleForm.useState"]).defaultColor,
        completed: schedule?.completed || false
    });
    // カテゴリー変更時に色を自動設定
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScheduleForm.useEffect": ()=>{
            if (!schedule) {
                const category = __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORIES"].find({
                    "ScheduleForm.useEffect.category": (c)=>c.value === formData.category
                }["ScheduleForm.useEffect.category"]);
                if (category) {
                    setFormData({
                        "ScheduleForm.useEffect": (prev)=>({
                                ...prev,
                                color: category.defaultColor
                            })
                    }["ScheduleForm.useEffect"]);
                }
            }
        }
    }["ScheduleForm.useEffect"], [
        formData.category,
        schedule
    ]);
    const handleChange = (e)=>{
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = e.target.checked;
            setFormData((prev)=>({
                    ...prev,
                    [name]: checked
                }));
        } else {
            setFormData((prev)=>({
                    ...prev,
                    [name]: value
                }));
        }
        // エラーをクリア
        if (errors[name]) {
            setErrors((prev)=>{
                const newErrors = {
                    ...prev
                };
                delete newErrors[name];
                return newErrors;
            });
        }
    };
    const handleColorSelect = (color)=>{
        setFormData((prev)=>({
                ...prev,
                color
            }));
    };
    const validate = ()=>{
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = 'タイトルを入力してください';
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidDate"])(formData.date)) {
            newErrors.date = '有効な日付を入力してください';
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidTime"])(formData.startTime)) {
            newErrors.startTime = '有効な時間を入力してください';
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidTime"])(formData.endTime)) {
            newErrors.endTime = '有効な時間を入力してください';
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidTime"])(formData.startTime) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidTime"])(formData.endTime) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidTimeRange"])(formData.startTime, formData.endTime)) {
            newErrors.endTime = '終了時間は開始時間より後にしてください';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!validate()) {
            return;
        }
        try {
            setLoading(true);
            const url = schedule ? `/api/schedules/${schedule.id}` : '/api/schedules';
            const method = schedule ? 'PUT' : 'POST';
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) {
                if (onSuccess) {
                    onSuccess();
                } else {
                    router.push('/schedules');
                    router.refresh();
                }
            } else {
                alert(data.error || '保存に失敗しました');
            }
        } catch (error) {
            console.error('Failed to save schedule:', error);
            alert('保存中にエラーが発生しました');
        } finally{
            setLoading(false);
        }
    };
    const handleDelete = async ()=>{
        if (!schedule) return;
        if (!confirm('この予定を削除しますか？')) {
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(`/api/schedules/${schedule.id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if (data.success) {
                router.push('/schedules');
                router.refresh();
            } else {
                alert(data.error || '削除に失敗しました');
            }
        } catch (error) {
            console.error('Failed to delete schedule:', error);
            alert('削除中にエラーが発生しました');
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].form,
        onSubmit: handleSubmit,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "title",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                        children: [
                            "タイトル",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].required,
                                children: "*"
                            }, void 0, false, {
                                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                                lineNumber: 192,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        id: "title",
                        name: "title",
                        value: formData.title,
                        onChange: handleChange,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input,
                        placeholder: "予定のタイトル"
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                        lineNumber: 194,
                        columnNumber: 9
                    }, this),
                    errors.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].error,
                        children: errors.title
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                        lineNumber: 203,
                        columnNumber: 26
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                lineNumber: 190,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "date",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                        children: [
                            "日付",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].required,
                                children: "*"
                            }, void 0, false, {
                                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                                lineNumber: 208,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "date",
                        id: "date",
                        name: "date",
                        value: formData.date,
                        onChange: handleChange,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                        lineNumber: 210,
                        columnNumber: 9
                    }, this),
                    errors.date && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].error,
                        children: errors.date
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                        lineNumber: 218,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                lineNumber: 206,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].timeRow,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "startTime",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                children: [
                                    "開始時間",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].required,
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                                        lineNumber: 224,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                                lineNumber: 223,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "time",
                                id: "startTime",
                                name: "startTime",
                                value: formData.startTime,
                                onChange: handleChange,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                            }, void 0, false, {
                                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                                lineNumber: 226,
                                columnNumber: 11
                            }, this),
                            errors.startTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].error,
                                children: errors.startTime
                            }, void 0, false, {
                                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                                lineNumber: 235,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "endTime",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                children: [
                                    "終了時間",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].required,
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                                        lineNumber: 241,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                                lineNumber: 240,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "time",
                                id: "endTime",
                                name: "endTime",
                                value: formData.endTime,
                                onChange: handleChange,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                            }, void 0, false, {
                                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                                lineNumber: 243,
                                columnNumber: 11
                            }, this),
                            errors.endTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].error,
                                children: errors.endTime
                            }, void 0, false, {
                                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                                lineNumber: 252,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                        lineNumber: 239,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                lineNumber: 221,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "category",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                        children: "カテゴリー"
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        id: "category",
                        name: "category",
                        value: formData.category,
                        onChange: handleChange,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].select,
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORIES"].map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: cat.value,
                                children: cat.label
                            }, cat.value, false, {
                                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                                lineNumber: 269,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                        lineNumber: 261,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                lineNumber: 257,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                        children: "色"
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                        lineNumber: 277,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].colorPicker,
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORIES"].map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].colorOption} ${formData.color === cat.defaultColor ? __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].selected : ''}`,
                                style: {
                                    backgroundColor: cat.defaultColor
                                },
                                onClick: ()=>handleColorSelect(cat.defaultColor),
                                "aria-label": `${cat.label}の色`
                            }, cat.defaultColor, false, {
                                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                                lineNumber: 280,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                        lineNumber: 278,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                lineNumber: 276,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "description",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                        children: "詳細"
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                        lineNumber: 295,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        id: "description",
                        name: "description",
                        value: formData.description,
                        onChange: handleChange,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].textarea,
                        placeholder: "予定の詳細説明"
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                        lineNumber: 298,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                lineNumber: 294,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkbox,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "checkbox",
                            id: "completed",
                            name: "completed",
                            checked: formData.completed,
                            onChange: handleChange
                        }, void 0, false, {
                            fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                            lineNumber: 310,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            htmlFor: "completed",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                            children: "完了済み"
                        }, void 0, false, {
                            fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                            lineNumber: 317,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                    lineNumber: 309,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                lineNumber: 308,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buttons,
                children: [
                    schedule && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].button} ${__TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buttonDanger}`,
                        onClick: handleDelete,
                        disabled: loading,
                        children: "削除"
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                        lineNumber: 325,
                        columnNumber: 11
                    }, this),
                    onCancel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].button} ${__TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buttonSecondary}`,
                        onClick: onCancel,
                        disabled: loading,
                        children: "キャンセル"
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                        lineNumber: 335,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].button} ${__TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buttonPrimary}`,
                        disabled: loading,
                        children: loading ? '保存中...' : schedule ? '更新' : '作成'
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                        lineNumber: 344,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                lineNumber: 323,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
        lineNumber: 189,
        columnNumber: 5
    }, this);
}
_s(ScheduleForm, "Rfum1qTe4GwCrK5IA7uJPOrS2TY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ScheduleForm;
var _c;
__turbopack_context__.k.register(_c, "ScheduleForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/calenderapp/app/schedules/new/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/schedules/new/page.tsx
__turbopack_context__.s([
    "default",
    ()=>NewSchedulePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$ScheduleForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calenderapp/components/Schedule/ScheduleForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calenderapp/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function NewSchedulePage() {
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const dateParam = searchParams.get('date');
    const initialDate = dateParam ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseDate"])(dateParam) : new Date();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "page-title",
                children: "新しい予定を作成"
            }, void 0, false, {
                fileName: "[project]/calenderapp/app/schedules/new/page.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$ScheduleForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                initialDate: initialDate
            }, void 0, false, {
                fileName: "[project]/calenderapp/app/schedules/new/page.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/calenderapp/app/schedules/new/page.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_s(NewSchedulePage, "a+DZx9DY26Zf8FVy1bxe3vp9l1w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = NewSchedulePage;
var _c;
__turbopack_context__.k.register(_c, "NewSchedulePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
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
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
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
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_52ac6bf3._.js.map