import type { Pagination } from "./pagination";

export interface Wayline {
  wayline_id?: string;
  wayline_type?: string;
  name?: string;
  distance?: number;
  duration?: number;
  finish_action?: string;
  fingerprint?: string;
  create_time?: number;
  update_time?: number;
}

export interface GetWaylinesResult {
  pagination: Pagination;
  list: Wayline[];
}

// ── 航线详情（单条航线 + 有序航点）─────────────────

export interface WaylinePointItem {
  /** 纬度 */
  latitude: number;
  /** 经度 */
  longitude: number;
  /** 飞行高度 (m) */
  height: number;
  /** 飞行速度 (m/s) */
  speed: number;
  /** 转弯模式 */
  turn_mode?: string;
}

export interface WaylineGlobalInfo extends Wayline {
  /** 飞向首航点模式 */
  fly_to_wayline_mode?: string;
  /** 遥控信号丢失动作 */
  rc_lost_action?: string;
  /** 转弯模式 */
  turn_mode?: string;
}

export interface WaylineDetailData {
  wayline_global_info: WaylineGlobalInfo;
  /** 有序航点数组 — 数组顺序 = 飞行执行顺序 */
  points: WaylinePointItem[];
}

export interface GetWaylineDetailResult {
  data: WaylineDetailData;
}
