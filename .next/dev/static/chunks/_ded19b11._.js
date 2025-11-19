(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/calenderapp/components/Calendar/Calendar.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "calendar": "Calendar-module__G1O1Vq__calendar",
  "container": "Calendar-module__G1O1Vq__container",
  "day": "Calendar-module__G1O1Vq__day",
  "dayNumber": "Calendar-module__G1O1Vq__dayNumber",
  "days": "Calendar-module__G1O1Vq__days",
  "error": "Calendar-module__G1O1Vq__error",
  "gotoButton": "Calendar-module__G1O1Vq__gotoButton",
  "gotoForm": "Calendar-module__G1O1Vq__gotoForm",
  "gotoInput": "Calendar-module__G1O1Vq__gotoInput",
  "gotoSelect": "Calendar-module__G1O1Vq__gotoSelect",
  "header": "Calendar-module__G1O1Vq__header",
  "loading": "Calendar-module__G1O1Vq__loading",
  "monthTitle": "Calendar-module__G1O1Vq__monthTitle",
  "navButton": "Calendar-module__G1O1Vq__navButton",
  "navigation": "Calendar-module__G1O1Vq__navigation",
  "otherMonth": "Calendar-module__G1O1Vq__otherMonth",
  "saturday": "Calendar-module__G1O1Vq__saturday",
  "scheduleCount": "Calendar-module__G1O1Vq__scheduleCount",
  "scheduleItem": "Calendar-module__G1O1Vq__scheduleItem",
  "scheduleList": "Calendar-module__G1O1Vq__scheduleList",
  "sunday": "Calendar-module__G1O1Vq__sunday",
  "today": "Calendar-module__G1O1Vq__today",
  "todayButton": "Calendar-module__G1O1Vq__todayButton",
  "weekDay": "Calendar-module__G1O1Vq__weekDay",
  "weekDays": "Calendar-module__G1O1Vq__weekDays",
});
}),
"[project]/calenderapp/components/Calendar/Calendar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Calendar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calenderapp/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/calenderapp/components/Calendar/Calendar.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function Calendar({ onDayClick }) {
    _s();
    const [currentDate, setCurrentDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date());
    const [schedules, setSchedules] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [calendarDays, setCalendarDays] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    // ヘッダの年/月入力用 (ユーザーが直接指定して移動できる)
    const [inputYear, setInputYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(year);
    const [inputMonth, setInputMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(month);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Calendar.useEffect": ()=>{
            // currentDate が変わったら入力値を同期する
            setInputYear(year);
            setInputMonth(month);
        }
    }["Calendar.useEffect"], [
        year,
        month
    ]);
    // 予定を取得
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Calendar.useEffect": ()=>{
            fetchSchedules();
        }
    }["Calendar.useEffect"], [
        year,
        month
    ]);
    // カレンダーデータを生成
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Calendar.useEffect": ()=>{
            const days = (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateCalendarDays"])(year, month, schedules);
            setCalendarDays(days);
        }
    }["Calendar.useEffect"], [
        year,
        month,
        schedules
    ]);
    const fetchSchedules = async ()=>{
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`/api/schedules?year=${year}&month=${month}`);
            const data = await response.json();
            if (data.success) {
                setSchedules(data.data || []);
            } else {
                setError(data.error || "予定の取得に失敗しました");
            }
        } catch (err) {
            setError("予定の取得中にエラーが発生しました");
            console.error(err);
        } finally{
            setLoading(false);
        }
    };
    const handlePrevMonth = ()=>{
        setCurrentDate(new Date(year, month - 2, 1));
    };
    const handleNextMonth = ()=>{
        setCurrentDate(new Date(year, month, 1));
    };
    const handleToday = ()=>{
        setCurrentDate(new Date());
    };
    const handleGotoSubmit = (e)=>{
        e.preventDefault();
        // 入力値を検証して移動
        const y = Number(inputYear) || year;
        let m = Number(inputMonth) || month;
        if (m < 1) m = 1;
        if (m > 12) m = 12;
        setCurrentDate(new Date(y, m - 1, 1));
    };
    const handleDayClick = (day)=>{
        if (onDayClick) {
            onDayClick(day.date, day.schedules);
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loading,
            children: "読み込み中..."
        }, void 0, false, {
            fileName: "[project]/calenderapp/components/Calendar/Calendar.tsx",
            lineNumber: 95,
            columnNumber: 12
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].error,
            children: error
        }, void 0, false, {
            fileName: "[project]/calenderapp/components/Calendar/Calendar.tsx",
            lineNumber: 99,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navigation,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navButton,
                                onClick: handlePrevMonth,
                                "aria-label": "前月",
                                children: "← 前月"
                            }, void 0, false, {
                                fileName: "[project]/calenderapp/components/Calendar/Calendar.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navButton,
                                onClick: handleNextMonth,
                                "aria-label": "次月",
                                children: "次月 →"
                            }, void 0, false, {
                                fileName: "[project]/calenderapp/components/Calendar/Calendar.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/calenderapp/components/Calendar/Calendar.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].gotoForm,
                        onSubmit: handleGotoSubmit,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].gotoInput,
                                value: inputYear,
                                onChange: (e)=>setInputYear(Number(e.target.value || 0)),
                                "aria-label": "年",
                                min: 1900,
                                max: 3000
                            }, void 0, false, {
                                fileName: "[project]/calenderapp/components/Calendar/Calendar.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "/"
                            }, void 0, false, {
                                fileName: "[project]/calenderapp/components/Calendar/Calendar.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].gotoSelect,
                                value: inputMonth,
                                onChange: (e)=>setInputMonth(Number(e.target.value)),
                                "aria-label": "月",
                                children: Array.from({
                                    length: 12
                                }, (_, i)=>i + 1).map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: m,
                                        children: m
                                    }, m, false, {
                                        fileName: "[project]/calenderapp/components/Calendar/Calendar.tsx",
                                        lineNumber: 141,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/calenderapp/components/Calendar/Calendar.tsx",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].gotoButton,
                                children: "移動"
                            }, void 0, false, {
                                fileName: "[project]/calenderapp/components/Calendar/Calendar.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/calenderapp/components/Calendar/Calendar.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].monthTitle,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMonthName"])(year, month)
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/Calendar/Calendar.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].todayButton,
                        onClick: handleToday,
                        "aria-label": "今日",
                        children: "今日"
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/Calendar/Calendar.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/calenderapp/components/Calendar/Calendar.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].calendar,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].weekDays,
                        children: [
                            0,
                            1,
                            2,
                            3,
                            4,
                            5,
                            6
                        ].map((dayIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].weekDay} ${dayIndex === 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sunday : dayIndex === 6 ? __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].saturday : ""}`,
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDayName"])(dayIndex)
                            }, dayIndex, false, {
                                fileName: "[project]/calenderapp/components/Calendar/Calendar.tsx",
                                lineNumber: 164,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/Calendar/Calendar.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].days,
                        children: calendarDays.map((day, index)=>{
                            const dayOfWeek = day.date.getDay();
                            const isSunday = dayOfWeek === 0;
                            const isSaturday = dayOfWeek === 6;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].day} ${!day.isCurrentMonth ? __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].otherMonth : ""} ${day.isToday ? __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].today : ""} ${isSunday ? __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sunday : ""} ${isSaturday ? __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].saturday : ""}`,
                                onClick: ()=>handleDayClick(day),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dayNumber,
                                        children: day.date.getDate()
                                    }, void 0, false, {
                                        fileName: "[project]/calenderapp/components/Calendar/Calendar.tsx",
                                        lineNumber: 195,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].scheduleList,
                                        children: [
                                            day.schedules.slice(0, 3).map((schedule)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].scheduleItem,
                                                    style: {
                                                        backgroundColor: schedule.color
                                                    },
                                                    title: `${schedule.startTime} ${schedule.title}`,
                                                    children: [
                                                        schedule.startTime,
                                                        " ",
                                                        schedule.title
                                                    ]
                                                }, schedule.id, true, {
                                                    fileName: "[project]/calenderapp/components/Calendar/Calendar.tsx",
                                                    lineNumber: 199,
                                                    columnNumber: 21
                                                }, this)),
                                            day.schedules.length > 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].scheduleCount,
                                                children: [
                                                    "他 ",
                                                    day.schedules.length - 3,
                                                    " 件"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/calenderapp/components/Calendar/Calendar.tsx",
                                                lineNumber: 209,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/calenderapp/components/Calendar/Calendar.tsx",
                                        lineNumber: 197,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/calenderapp/components/Calendar/Calendar.tsx",
                                lineNumber: 186,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/Calendar/Calendar.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/calenderapp/components/Calendar/Calendar.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/calenderapp/components/Calendar/Calendar.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, this);
}
_s(Calendar, "gfKqDPPTaSaOQzgjXS4Tuu5KDhw=");
_c = Calendar;
var _c;
__turbopack_context__.k.register(_c, "Calendar");
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
]);

//# sourceMappingURL=_ded19b11._.js.map