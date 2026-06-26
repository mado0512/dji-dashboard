import type { GetWaylineDetailResult } from "$lib/types/wayline";

// ── Shared mock detail data (client + server accessible) ──
// ── 航线详情（含有序航点）────────────────────────────

const MOCK_DETAILS: Record<string, GetWaylineDetailResult> = {
  "wl-7001": {
    data: {
      wayline_global_info: {
        wayline_id: "wl-7001",
        name: "湄潭茶园 A 区植保航线",
        wayline_type: "waypoint",
        distance: 1200,
        duration: 480,
        finish_action: "return_home",
        fly_to_wayline_mode: "direct",
        rc_lost_action: "return_home",
        turn_mode: "banked",
        fingerprint: "a1b2c3-meitan-tea-a",
        create_time: 1717200000000,
        update_time: 1722000000000,
      },
      points: [
        { latitude: 27.7652, longitude: 107.5023, height: 0, speed: 0, turn_mode: "start" },
        { latitude: 27.7658, longitude: 107.5031, height: 15, speed: 5, turn_mode: "banked" },
        { latitude: 27.7668, longitude: 107.5045, height: 20, speed: 6, turn_mode: "banked" },
        { latitude: 27.7682, longitude: 107.5062, height: 20, speed: 6, turn_mode: "banked" },
        { latitude: 27.7698, longitude: 107.508, height: 20, speed: 6, turn_mode: "banked" },
        { latitude: 27.7715, longitude: 107.5098, height: 15, speed: 5, turn_mode: "banked" },
        { latitude: 27.7728, longitude: 107.5112, height: 8, speed: 3, turn_mode: "banked" },
        { latitude: 27.7735, longitude: 107.512, height: 0, speed: 0, turn_mode: "stop" },
      ],
    },
  },
  "wl-7002": {
    data: {
      wayline_global_info: {
        wayline_id: "wl-7002",
        name: "梵净山南坡测绘航线",
        wayline_type: "mapping",
        distance: 3500,
        duration: 1200,
        finish_action: "return_home",
        fly_to_wayline_mode: "direct",
        rc_lost_action: "return_home",
        turn_mode: "banked",
        fingerprint: "d4e5f6-fanjingshan-survey",
        create_time: 1718500000000,
        update_time: 1718500000000,
      },
      points: [
        { latitude: 27.908, longitude: 108.688, height: 0, speed: 0, turn_mode: "start" },
        { latitude: 27.9095, longitude: 108.69, height: 120, speed: 8, turn_mode: "banked" },
        { latitude: 27.911, longitude: 108.6925, height: 120, speed: 8, turn_mode: "banked" },
        { latitude: 27.9125, longitude: 108.695, height: 120, speed: 8, turn_mode: "banked" },
        { latitude: 27.914, longitude: 108.6975, height: 150, speed: 8, turn_mode: "banked" },
        { latitude: 27.915, longitude: 108.7, height: 180, speed: 7, turn_mode: "banked" },
        { latitude: 27.9155, longitude: 108.7025, height: 200, speed: 6, turn_mode: "banked" },
        { latitude: 27.916, longitude: 108.705, height: 220, speed: 5, turn_mode: "banked" },
        { latitude: 27.9165, longitude: 108.707, height: 200, speed: 6, turn_mode: "banked" },
        { latitude: 27.9155, longitude: 108.709, height: 150, speed: 7, turn_mode: "banked" },
        { latitude: 27.914, longitude: 108.71, height: 100, speed: 5, turn_mode: "banked" },
        { latitude: 27.9125, longitude: 108.7105, height: 50, speed: 3, turn_mode: "banked" },
        { latitude: 27.911, longitude: 108.7108, height: 0, speed: 0, turn_mode: "stop" },
      ],
    },
  },
  "wl-7003": {
    data: {
      wayline_global_info: {
        wayline_id: "wl-7003",
        name: "赤水河谷运输航线",
        wayline_type: "waypoint",
        distance: 800,
        duration: 300,
        finish_action: "land",
        fly_to_wayline_mode: "direct",
        rc_lost_action: "land",
        turn_mode: "banked",
        fingerprint: "g7h8i9-chishui-cargo",
        create_time: 1722000000000,
        update_time: 1725100000000,
      },
      points: [
        { latitude: 28.58, longitude: 105.695, height: 0, speed: 0, turn_mode: "start" },
        { latitude: 28.5785, longitude: 105.697, height: 30, speed: 5, turn_mode: "banked" },
        { latitude: 28.576, longitude: 105.699, height: 40, speed: 6, turn_mode: "banked" },
        { latitude: 28.574, longitude: 105.7005, height: 40, speed: 6, turn_mode: "banked" },
        { latitude: 28.572, longitude: 105.7015, height: 30, speed: 4, turn_mode: "banked" },
        { latitude: 28.5705, longitude: 105.702, height: 0, speed: 0, turn_mode: "stop" },
      ],
    },
  },
  "wl-7004": {
    data: {
      wayline_global_info: {
        wayline_id: "wl-7004",
        name: "都匀毛尖 B 区低空喷洒",
        wayline_type: "waypoint",
        distance: 950,
        duration: 380,
        finish_action: "return_home",
        fly_to_wayline_mode: "direct",
        rc_lost_action: "return_home",
        turn_mode: "banked",
        fingerprint: "j0k1l2-duyun-tea-b",
        create_time: 1723500000000,
        update_time: 1726000000000,
      },
      points: [
        { latitude: 26.265, longitude: 107.512, height: 0, speed: 0, turn_mode: "start" },
        { latitude: 26.2665, longitude: 107.5135, height: 12, speed: 5, turn_mode: "banked" },
        { latitude: 26.268, longitude: 107.515, height: 12, speed: 5, turn_mode: "banked" },
        { latitude: 26.2695, longitude: 107.5165, height: 12, speed: 5, turn_mode: "banked" },
        { latitude: 26.271, longitude: 107.518, height: 12, speed: 5, turn_mode: "banked" },
        { latitude: 26.272, longitude: 107.5195, height: 8, speed: 3, turn_mode: "banked" },
        { latitude: 26.2725, longitude: 107.5205, height: 0, speed: 0, turn_mode: "stop" },
      ],
    },
  },
  "wl-7005": {
    data: {
      wayline_global_info: {
        wayline_id: "wl-7005",
        name: "雷公坪瞭望点巡逻航线",
        wayline_type: "waypoint",
        distance: 2200,
        duration: 750,
        finish_action: "return_home",
        fly_to_wayline_mode: "direct",
        rc_lost_action: "return_home",
        turn_mode: "banked",
        fingerprint: "m3n4o5-leigongping-patrol",
        create_time: 1720000000000,
        update_time: 1720000000000,
      },
      points: [
        { latitude: 26.382, longitude: 108.198, height: 0, speed: 0, turn_mode: "start" },
        { latitude: 26.3835, longitude: 108.2, height: 80, speed: 6, turn_mode: "banked" },
        { latitude: 26.385, longitude: 108.2025, height: 100, speed: 7, turn_mode: "banked" },
        { latitude: 26.3865, longitude: 108.205, height: 100, speed: 7, turn_mode: "banked" },
        { latitude: 26.388, longitude: 108.2075, height: 100, speed: 7, turn_mode: "banked" },
        { latitude: 26.3895, longitude: 108.2095, height: 120, speed: 6, turn_mode: "banked" },
        { latitude: 26.391, longitude: 108.211, height: 80, speed: 5, turn_mode: "banked" },
        { latitude: 26.3895, longitude: 108.2125, height: 80, speed: 5, turn_mode: "banked" },
        { latitude: 26.388, longitude: 108.2105, height: 60, speed: 4, turn_mode: "banked" },
        { latitude: 26.3865, longitude: 108.208, height: 40, speed: 3, turn_mode: "banked" },
        { latitude: 26.3845, longitude: 108.205, height: 20, speed: 2, turn_mode: "banked" },
        { latitude: 26.383, longitude: 108.202, height: 0, speed: 0, turn_mode: "stop" },
      ],
    },
  },
};

export function getWaylineDetailMock(wayline_id: string): GetWaylineDetailResult {
  const detail = MOCK_DETAILS[wayline_id];
  if (!detail) {
    throw new Error(`Wayline "${wayline_id}" not found`);
  }
  return detail;
}
