import type { MockMode } from "./index";
import { apiGetMock } from "./client";
import type { GetTasksResult, TaskStatistics, GetTrackResult } from "$lib/types/task";

// ── 贵州茗峰农业 — 任务 ──────────────────────────────
// 植保喷洒 + 山区测绘 + 物资运输 + 茶园巡检
// ─────────────────────────────────────────────────────

export const MOCK_TASKS = [
  {
    id: "task-3001",
    task_name: "湄潭茶园 A 区春季植保",
    device_sn: "3UJ8K9A2B001",
    remark: "生物制剂喷洒，避开蜂箱区",
    status: 5,
    code: 0,
    created_nickname: "陈连山",
    start_time: 1723021200000,
    end_time: 1723024800000,
    estimate_time: 360,
    mission: { mission_name: "茶园植保标准流程", estimate_time: 360 },
  },
  {
    id: "task-3002",
    task_name: "梵净山南坡地形测绘",
    device_sn: "7FN2P6L8E003",
    remark: "1:500 精度，覆盖 3.2 km²",
    status: 5,
    code: 0,
    created_nickname: "龙云",
    start_time: 1723200000000,
    end_time: 1723207200000,
    estimate_time: 1200,
    mission: { mission_name: "山区带状测绘", estimate_time: 1200 },
  },
  {
    id: "task-3003",
    task_name: "赤水河谷物资投送",
    device_sn: "2BR6Y8C0J005",
    remark: "向赤水渡口投送 15 kg 医疗物资",
    status: 3,
    code: 0,
    created_nickname: "杨梅",
    start_time: 1723708800000,
    estimate_time: 300,
    mission: { mission_name: "定点投放", estimate_time: 300 },
  },
  {
    id: "task-3004",
    task_name: "雷公坪瞭望点红外巡检",
    device_sn: "9XH4V1T3Q004",
    remark: "夜间热成像，监测林区异常热源",
    status: 6,
    code: 3401,
    reason: "GNSS 信号弱，飞机触发自动返航",
    created_nickname: "吴骁",
    start_time: 1723400000000,
    end_time: 1723401800000,
    estimate_time: 750,
    mission: { mission_name: "夜巡热成像", estimate_time: 750 },
  },
  {
    id: "task-3005",
    task_name: "都匀毛尖 B 区追肥喷洒",
    device_sn: "3UJ8K9A2B001",
    remark: "叶面肥 A3 配方",
    status: 2,
    code: 0,
    created_nickname: "何芳",
    start_time: 1724112000000,
    estimate_time: 380,
    mission: { mission_name: "茶园植保标准流程", estimate_time: 360 },
  },
];

export const MOCK_STATISTICS: TaskStatistics = {
  id: "task-3001",
  distance: 3200,
  duration: 480,
  max_wind_speed: 6.2,
  power_consumption: 58,
  steady_load: 8.5,
};

export const MOCK_TRACK: GetTrackResult = {
  list: [
    {
      sn: "3UJ8K9A2B001",
      timestamp: 1723021200000,
      track_id: "track-meitan-tea-20240807-a",
      points: [
        { timestamp: 1723021200000, latitude: 27.7652, longitude: 107.5023, height: 0 },
        { timestamp: 1723021205000, latitude: 27.7658, longitude: 107.5031, height: 12.5 },
        { timestamp: 1723021210000, latitude: 27.7665, longitude: 107.504, height: 25.0 },
        { timestamp: 1723021220000, latitude: 27.768, longitude: 107.5058, height: 45.0 },
        { timestamp: 1723021230000, latitude: 27.7695, longitude: 107.5075, height: 45.0 },
        { timestamp: 1723021240000, latitude: 27.771, longitude: 107.5092, height: 45.0 },
        { timestamp: 1723021250000, latitude: 27.7725, longitude: 107.511, height: 45.0 },
        { timestamp: 1723021260000, latitude: 27.774, longitude: 107.5128, height: 45.0 },
        { timestamp: 1723021270000, latitude: 27.775, longitude: 107.514, height: 30.0 },
        { timestamp: 1723021275000, latitude: 27.7755, longitude: 107.5146, height: 12.0 },
        { timestamp: 1723021280000, latitude: 27.776, longitude: 107.5152, height: 0 },
      ],
    },
  ],
};

// ── Static mock ───────────────────────────────────────

export async function getTaskListMock(
  _group_id: string,
  opts: { page?: number; page_size?: number },
): Promise<GetTasksResult> {
  await new Promise((r) => setTimeout(r, 300));
  const page = opts.page ?? 1;
  const page_size = opts.page_size ?? 20;
  return {
    pagination: { page, page_size, total: MOCK_TASKS.length },
    list: MOCK_TASKS.slice((page - 1) * page_size, page * page_size),
  };
}

export async function getTaskStatisticsMock(
  _group_id: string,
  _task_id: string,
): Promise<TaskStatistics> {
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_STATISTICS;
}

export async function getTaskTrackMock(
  _group_id: string,
  _task_id: string,
): Promise<GetTrackResult> {
  await new Promise((r) => setTimeout(r, 250));
  return MOCK_TRACK;
}

// ── ApiFox mock ───────────────────────────────────────

export async function getTaskListApiMock(
  group_id: string,
  opts: Record<string, unknown>,
): Promise<GetTasksResult> {
  return apiGetMock<GetTasksResult>(
    `/task/sdk/v1/groups/${group_id}/tasks`,
    opts as Record<string, string | number | undefined>,
  );
}

export async function getTaskStatisticsApiMock(
  group_id: string,
  task_id: string,
): Promise<TaskStatistics> {
  return apiGetMock<TaskStatistics>(`/task/sdk/v1/groups/${group_id}/tasks/${task_id}/statistics`);
}

export async function getTaskTrackApiMock(
  group_id: string,
  task_id: string,
): Promise<GetTrackResult> {
  return apiGetMock<GetTrackResult>(`/task/sdk/v1/groups/${group_id}/tasks/${task_id}/track`);
}

// ── Resolvers ─────────────────────────────────────────

export async function getTasksMock(
  mode: MockMode,
  group_id: string,
  opts: Record<string, unknown>,
): Promise<GetTasksResult> {
  if (mode === "static")
    return getTaskListMock(group_id, opts as { page?: number; page_size?: number });
  if (mode === "api") return getTaskListApiMock(group_id, opts);
  throw new Error(`Mock mode "${mode}" not supported for tasks`);
}

export async function getStatisticsMock(
  mode: MockMode,
  group_id: string,
  task_id: string,
): Promise<TaskStatistics> {
  if (mode === "static") return getTaskStatisticsMock(group_id, task_id);
  if (mode === "api") return getTaskStatisticsApiMock(group_id, task_id);
  throw new Error(`Mock mode "${mode}" not supported for statistics`);
}

export async function getTrackMock(
  mode: MockMode,
  group_id: string,
  task_id: string,
): Promise<GetTrackResult> {
  if (mode === "static") return getTaskTrackMock(group_id, task_id);
  if (mode === "api") return getTaskTrackApiMock(group_id, task_id);
  throw new Error(`Mock mode "${mode}" not supported for track`);
}
