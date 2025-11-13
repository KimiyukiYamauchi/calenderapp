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
"use client";
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
        startTime: schedule?.startTime || "09:00",
        endTime: schedule?.endTime || "10:00",
        title: schedule?.title || "",
        description: schedule?.description || "",
        category: schedule?.category || "other",
        color: schedule?.color || __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORIES"].find({
            "ScheduleForm.useState": (c)=>c.value === "other"
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
        if (type === "checkbox") {
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
            newErrors.title = "タイトルを入力してください";
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidDate"])(formData.date)) {
            newErrors.date = "有効な日付を入力してください";
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidTime"])(formData.startTime)) {
            newErrors.startTime = "有効な時間を入力してください";
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidTime"])(formData.endTime)) {
            newErrors.endTime = "有効な時間を入力してください";
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidTime"])(formData.startTime) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidTime"])(formData.endTime) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidTimeRange"])(formData.startTime, formData.endTime)) {
            newErrors.endTime = "終了時間は開始時間より後にしてください";
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
            const url = schedule ? `/api/schedules/${schedule.id}` : "/api/schedules";
            const method = schedule ? "PUT" : "POST";
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
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
        } finally{
            setLoading(false);
        }
    };
    const handleDelete = async ()=>{
        if (!schedule) return;
        if (!confirm("この予定を削除しますか？")) {
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(`/api/schedules/${schedule.id}`, {
                method: "DELETE"
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
                                lineNumber: 197,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                        lineNumber: 196,
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
                        lineNumber: 199,
                        columnNumber: 9
                    }, this),
                    errors.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].error,
                        children: errors.title
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                        lineNumber: 208,
                        columnNumber: 26
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                lineNumber: 195,
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
                                lineNumber: 213,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                        lineNumber: 212,
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
                        lineNumber: 215,
                        columnNumber: 9
                    }, this),
                    errors.date && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].error,
                        children: errors.date
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                        lineNumber: 223,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                lineNumber: 211,
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
                                        lineNumber: 229,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                                lineNumber: 228,
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
                                lineNumber: 231,
                                columnNumber: 11
                            }, this),
                            errors.startTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].error,
                                children: errors.startTime
                            }, void 0, false, {
                                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                                lineNumber: 240,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                        lineNumber: 227,
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
                                        lineNumber: 246,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                                lineNumber: 245,
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
                                lineNumber: 248,
                                columnNumber: 11
                            }, this),
                            errors.endTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].error,
                                children: errors.endTime
                            }, void 0, false, {
                                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                                lineNumber: 257,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                        lineNumber: 244,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                lineNumber: 226,
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
                        lineNumber: 263,
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
                                lineNumber: 274,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                        lineNumber: 266,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                lineNumber: 262,
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
                        lineNumber: 282,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].colorPicker,
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORIES"].map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].colorOption} ${formData.color === cat.defaultColor ? __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].selected : ""}`,
                                style: {
                                    backgroundColor: cat.defaultColor
                                },
                                onClick: ()=>handleColorSelect(cat.defaultColor),
                                "aria-label": `${cat.label}の色`
                            }, cat.defaultColor, false, {
                                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                                lineNumber: 285,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                        lineNumber: 283,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                lineNumber: 281,
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
                        lineNumber: 300,
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
                        lineNumber: 303,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                lineNumber: 299,
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
                            lineNumber: 315,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            htmlFor: "completed",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                            children: "完了済み"
                        }, void 0, false, {
                            fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                            lineNumber: 322,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                    lineNumber: 314,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                lineNumber: 313,
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
                        lineNumber: 330,
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
                        lineNumber: 340,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].button} ${__TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$Schedule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buttonPrimary}`,
                        disabled: loading,
                        children: loading ? "保存中..." : schedule ? "更新" : "作成"
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                        lineNumber: 349,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
                lineNumber: 328,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/calenderapp/components/Schedule/ScheduleForm.tsx",
        lineNumber: 194,
        columnNumber: 5
    }, this);
}
_s(ScheduleForm, "dFsafAJi7oOYV/GYbTfllaXf8LY=", false, function() {
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
"[project]/calenderapp/components/Schedule/QuickAddModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuickAddModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$ScheduleForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calenderapp/components/Schedule/ScheduleForm.tsx [app-client] (ecmascript)");
"use client";
;
;
function QuickAddModal({ initialDate, onClose, onSaved }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: 16
        },
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                background: "#fff",
                borderRadius: 8,
                maxWidth: 720,
                width: "100%",
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                padding: 16
            },
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        justifyContent: "flex-end"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        "aria-label": "閉じる",
                        style: {
                            background: "transparent",
                            border: "none",
                            fontSize: 18
                        },
                        children: "✕"
                    }, void 0, false, {
                        fileName: "[project]/calenderapp/components/Schedule/QuickAddModal.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/calenderapp/components/Schedule/QuickAddModal.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    style: {
                        marginTop: 0
                    },
                    children: "予定を追加"
                }, void 0, false, {
                    fileName: "[project]/calenderapp/components/Schedule/QuickAddModal.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$components$2f$Schedule$2f$ScheduleForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    initialDate: initialDate,
                    onSuccess: ()=>{
                        onSaved();
                    },
                    onCancel: onClose
                }, void 0, false, {
                    fileName: "[project]/calenderapp/components/Schedule/QuickAddModal.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/calenderapp/components/Schedule/QuickAddModal.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/calenderapp/components/Schedule/QuickAddModal.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = QuickAddModal;
var _c;
__turbopack_context__.k.register(_c, "QuickAddModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/calenderapp/components/Schedule/QuickAddModal.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/calenderapp/components/Schedule/QuickAddModal.tsx [app-client] (ecmascript)"));
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_72073f28._.js.map