module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/calenderapp/lib/microcms.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/microcms.ts
__turbopack_context__.s([
    "client",
    ()=>client,
    "createSchedule",
    ()=>createSchedule,
    "createScheduleBulk",
    ()=>createScheduleBulk,
    "deleteSchedule",
    ()=>deleteSchedule,
    "getSchedule",
    ()=>getSchedule,
    "getSchedules",
    ()=>getSchedules,
    "getSchedulesByDateRange",
    ()=>getSchedulesByDateRange,
    "updateSchedule",
    ()=>updateSchedule
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$microcms$2d$js$2d$sdk$2f$dist$2f$esm$2f$microcms$2d$js$2d$sdk$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/microcms-js-sdk/dist/esm/microcms-js-sdk.js [app-route] (ecmascript)");
;
// If microCMS environment variables are provided, use the real client.
// Otherwise fall back to a simple in-memory store for local development.
const hasMicroCMSEnv = !!process.env.MICROCMS_SERVICE_DOMAIN && !!process.env.MICROCMS_API_KEY;
const client = hasMicroCMSEnv ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$microcms$2d$js$2d$sdk$2f$dist$2f$esm$2f$microcms$2d$js$2d$sdk$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY
}) : null;
// In-memory fallback store for development when microCMS is not configured
const inMemoryStore = [];
function generateId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
async function getSchedules(year, month) {
    try {
        // If microCMS client is not configured, use in-memory store
        if (!client) {
            if (year && month) {
                const prefix = `${year}-${String(month).padStart(2, "0")}`;
                return inMemoryStore.filter((s)=>s.date.startsWith(prefix));
            }
            return [
                ...inMemoryStore
            ];
        }
        let filters = "";
        if (year && month) {
            // 指定された月の予定のみを取得
            const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
            const endDate = `${year}-${String(month).padStart(2, "0")}-31`;
            filters = `date[greater_than]${startDate}[and]date[less_than]${endDate}`;
        }
        const response = await client.get({
            endpoint: "schedules",
            queries: {
                limit: 100,
                orders: "date",
                ...filters && {
                    filters
                }
            }
        });
        return response.contents;
    } catch (error) {
        console.error("Failed to fetch schedules:", error);
        throw error;
    }
}
async function getSchedule(id) {
    try {
        if (!client) {
            const found = inMemoryStore.find((s)=>s.id === id);
            if (!found) throw new Error(`Schedule ${id} not found`);
            return found;
        }
        const schedule = await client.get({
            endpoint: "schedules",
            contentId: id
        });
        return schedule;
    } catch (error) {
        console.error(`Failed to fetch schedule ${id}:`, error);
        throw error;
    }
}
async function createSchedule(data) {
    try {
        if (!client) {
            const id = generateId();
            const now = new Date().toISOString();
            const schedule = {
                ...data,
                id,
                completed: data.completed ?? false,
                createdAt: now,
                updatedAt: now
            };
            inMemoryStore.push(schedule);
            return schedule;
        }
        const response = await client.create({
            endpoint: "schedules",
            content: {
                ...data,
                completed: data.completed ?? false
            }
        });
        return {
            ...data,
            id: response.id,
            completed: data.completed ?? false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    } catch (error) {
        console.error("Failed to create schedule:", error);
        throw error;
    }
}
async function updateSchedule(id, data) {
    try {
        if (!client) {
            const idx = inMemoryStore.findIndex((s)=>s.id === id);
            if (idx === -1) throw new Error(`Schedule ${id} not found`);
            const updated = {
                ...inMemoryStore[idx],
                ...data,
                updatedAt: new Date().toISOString()
            };
            inMemoryStore[idx] = updated;
            return updated;
        }
        await client.update({
            endpoint: "schedules",
            contentId: id,
            content: data
        });
        // 更新後のデータを取得
        return await getSchedule(id);
    } catch (error) {
        console.error(`Failed to update schedule ${id}:`, error);
        throw error;
    }
}
async function deleteSchedule(id) {
    try {
        if (!client) {
            const idx = inMemoryStore.findIndex((s)=>s.id === id);
            if (idx === -1) throw new Error(`Schedule ${id} not found`);
            inMemoryStore.splice(idx, 1);
            return;
        }
        await client.delete({
            endpoint: "schedules",
            contentId: id
        });
    } catch (error) {
        console.error(`Failed to delete schedule ${id}:`, error);
        throw error;
    }
}
async function createScheduleBulk(schedules) {
    try {
        // createSchedule already handles microCMS vs in-memory fallback
        const results = await Promise.all(schedules.map((schedule)=>createSchedule(schedule)));
        return results;
    } catch (error) {
        console.error("Failed to create schedules in bulk:", error);
        throw error;
    }
}
async function getSchedulesByDateRange(startDate, endDate) {
    try {
        if (!client) {
            return inMemoryStore.filter((s)=>s.date > startDate && s.date < endDate);
        }
        const filters = `date[greater_than]${startDate}[and]date[less_than]${endDate}`;
        const response = await client.get({
            endpoint: "schedules",
            queries: {
                limit: 100,
                orders: "date",
                filters
            }
        });
        return response.contents;
    } catch (error) {
        console.error("Failed to fetch schedules by date range:", error);
        throw error;
    }
}
}),
"[project]/calenderapp/app/api/schedules/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/api/schedules/route.ts
__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$microcms$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/calenderapp/lib/microcms.ts [app-route] (ecmascript)");
;
;
async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const year = searchParams.get("year");
        const month = searchParams.get("month");
        const schedules = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$microcms$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSchedules"])(year ? parseInt(year) : undefined, month ? parseInt(month) : undefined);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: schedules
        });
    } catch (error) {
        console.error("Failed to fetch schedules:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "予定の取得に失敗しました"
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        // 一括作成の場合
        if (Array.isArray(body)) {
            const schedules = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$microcms$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createScheduleBulk"])(body);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                data: schedules
            }, {
                status: 201
            });
        }
        // 単体作成の場合
        const schedule = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$calenderapp$2f$lib$2f$microcms$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSchedule"])(body);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: schedule
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Failed to create schedule:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "予定の作成に失敗しました"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f4c66f16._.js.map