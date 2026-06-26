import type { Pagination } from "./pagination";

// ── Task ──────────────────────────────────────────────

export interface MissionItem {
  mission_id?: string;
  mission_name?: string;
  estimate_time?: number;
  origin_mission_id?: string;
}

export interface Task {
  id?: string;
  group_id?: string;
  task_name?: string;
  device_sn?: string;
  remark?: string;
  /** 0=正常，非0=异常 */
  code?: number;
  /** 2-待确认 3-自动执行中 4-手动执行中 5-执行成功 6-执行失败 */
  status?: number;
  reason?: string;
  created_nickname?: string;
  create_time?: number;
  update_time?: number;
  start_time?: number;
  estimate_time?: number;
  end_time?: number;
  mission?: MissionItem;
  notifies?: string[];
}

/** Task 状态码 → 中文标签 */
export const TASK_STATUS: Record<number, string> = {
  2: "待确认",
  3: "自动执行中",
  4: "手动执行中",
  5: "执行成功",
  6: "执行失败",
};

export function taskStatusLabel(status?: number): string {
  return TASK_STATUS[status ?? -1] ?? `未知(${status})`;
}

export interface GetTasksResult {
  pagination: Pagination;
  list: Task[];
}

// ── Statistics ────────────────────────────────────────

export interface TaskStatistics {
  /** 任务 ID */
  id?: string;
  /** 任务运输距离（米） */
  distance?: number;
  /** 任务运输时间（秒） */
  duration?: number;
  /** 任务过程最大风速（m/s） */
  max_wind_speed?: number;
  /** 任务消耗电量百分比，双电满电为 100% */
  power_consumption?: number;
  /** 任务运输载重（kg） */
  steady_load?: number;
}

// ── Track ─────────────────────────────────────────────

export interface TrackPoint {
  /** 轨迹点时间戳 */
  timestamp?: number;
  /** 纬度 */
  latitude?: number;
  /** 经度 */
  longitude?: number;
  /** 高度（米） */
  height?: number;
}

export interface TrackItem {
  /** 设备 SN */
  sn?: string;
  /** 轨迹开始时间戳 */
  timestamp?: number;
  /** 单条轨迹唯一 ID */
  track_id?: string;
  /** 飞机随时序移动的 3D 空间坐标 */
  points?: TrackPoint[];
}

export interface GetTrackResult {
  list: TrackItem[];
}
