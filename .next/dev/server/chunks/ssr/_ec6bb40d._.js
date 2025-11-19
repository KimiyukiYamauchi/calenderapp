module.exports = [
"[project]/calenderapp/components/Schedule/Schedule.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

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
"[project]/calenderapp/components/Schedule/ScheduleList.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScheduleList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/calenderapp/components/Schedule/Schedule.module.css [app-ssr] (css module)");
"use client";
;
;
;
const DEFAULT_TITLE = "(無題)";
function sortSchedules(a, b) {
    // 日付＋開始時刻で昇順ソート
    return (a.date + a.startTime).localeCompare(b.date + b.startTime);
}
function groupByTitle(schedules) {
    const map = new Map();
    for (const s of schedules){
        const key = s.title || DEFAULT_TITLE;
        const arr = map.get(key) || [];
        arr.push(s);
        map.set(key, arr);
    }
    const grouped = Array.from(map.entries()).map(([title, items])=>({
            title,
            items: items.sort(sortSchedules)
        }));
    // 件数が多い順にソート
    return grouped.sort((a, b)=>b.items.length - a.items.length);
}
function ScheduleList() {
    const [groups, setGroups] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
            const schedules = data.data || [];
            setGroups(groupByTitle(schedules));
        } catch (err) {
            console.error(err);
            setError("予定一覧の取得中にエラーが発生しました");
        } finally{
            setLoading(false);
        }
    }
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].empty,
        children: "読み込み中..."
    }, void 0, false, {
        fileName: "[project]/calenderapp/components/Schedule/ScheduleList.tsx",
        lineNumber: 68,
        columnNumber: 23
    }, this);
    if (error) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].error,
        children: error
    }, void 0, false, {
        fileName: "[project]/calenderapp/components/Schedule/ScheduleList.tsx",
        lineNumber: 69,
        columnNumber: 21
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].list,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].listHeader,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].listTitle,
                    children: "予定一覧（タイトル別）"
                }, void 0, false, {
                    fileName: "[project]/calenderapp/components/Schedule/ScheduleList.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/calenderapp/components/Schedule/ScheduleList.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            groups.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].empty,
                children: "予定がありません"
            }, void 0, false, {
                fileName: "[project]/calenderapp/components/Schedule/ScheduleList.tsx",
                lineNumber: 78,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].scheduleItems,
                children: groups.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].card,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardHeader,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardTitle,
                                    children: [
                                        g.title,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardMeta,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    g.items.length,
                                                    " 件"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/calenderapp/components/Schedule/ScheduleList.tsx",
                                                lineNumber: 87,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/calenderapp/components/Schedule/ScheduleList.tsx",
                                            lineNumber: 86,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/calenderapp/components/Schedule/ScheduleList.tsx",
                                    lineNumber: 84,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/calenderapp/components/Schedule/ScheduleList.tsx",
                                lineNumber: 83,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                children: g.items.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        onDoubleClick: ()=>{
                                            // ダブルクリックでカレンダーの該当日に移動
                                            // 日付は YYYY-MM-DD 形式をそのまま渡す
                                            router.push(`/?focus=${encodeURIComponent(s.date)}`);
                                        },
                                        style: {
                                            cursor: "pointer"
                                        },
                                        title: "ダブルクリックでカレンダーに移動",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardMeta,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        s.date,
                                                        " ",
                                                        s.startTime,
                                                        s.endTime ? ` - ${s.endTime}` : ""
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/calenderapp/components/Schedule/ScheduleList.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/calenderapp/components/Schedule/ScheduleList.tsx",
                                                lineNumber: 104,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardDescription,
                                                children: [
                                                    s.title ? "" : "（タイトルなし）",
                                                    s.description || ""
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/calenderapp/components/Schedule/ScheduleList.tsx",
                                                lineNumber: 110,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, s.id, true, {
                                        fileName: "[project]/calenderapp/components/Schedule/ScheduleList.tsx",
                                        lineNumber: 94,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/calenderapp/components/Schedule/ScheduleList.tsx",
                                lineNumber: 92,
                                columnNumber: 15
                            }, this)
                        ]
                    }, g.title, true, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleList.tsx",
                        lineNumber: 82,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/calenderapp/components/Schedule/ScheduleList.tsx",
                lineNumber: 80,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/calenderapp/components/Schedule/ScheduleList.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
];

//# sourceMappingURL=_ec6bb40d._.js.map