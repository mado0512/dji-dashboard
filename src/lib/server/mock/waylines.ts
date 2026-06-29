import type { GetWaylinesResult } from "$lib/types/wayline";

// ── 贵州茗峰农业 — 航线 ──────────────────────────────
// 茶园植保喷洒 + 山区地形测绘 + 河谷运输
// ─────────────────────────────────────────────────────

export const MOCK_WAYLINES = [
  {
    wayline_id: "wl-7001",
    name: "湄潭茶园 A 区植保航线",
    wayline_type: "waypoint",
    distance: 1200,
    duration: 480,
    finish_action: "return_home",
    fingerprint: "a1b2c3-meitan-tea-a",
    create_time: 1717200000000,
    update_time: 1722000000000,
  },
  {
    wayline_id: "wl-7002",
    name: "梵净山南坡测绘航线",
    wayline_type: "mapping",
    distance: 3500,
    duration: 1200,
    finish_action: "return_home",
    fingerprint: "d4e5f6-fanjingshan-survey",
    create_time: 1718500000000,
    update_time: 1718500000000,
  },
  {
    wayline_id: "wl-7003",
    name: "赤水河谷运输航线",
    wayline_type: "waypoint",
    distance: 800,
    duration: 300,
    finish_action: "land",
    fingerprint: "g7h8i9-chishui-cargo",
    create_time: 1722000000000,
    update_time: 1725100000000,
  },
  {
    wayline_id: "wl-7004",
    name: "都匀毛尖 B 区低空喷洒",
    wayline_type: "waypoint",
    distance: 950,
    duration: 380,
    finish_action: "return_home",
    fingerprint: "j0k1l2-duyun-tea-b",
    create_time: 1723500000000,
    update_time: 1726000000000,
  },
  {
    wayline_id: "wl-7005",
    name: "雷公坪瞭望点巡逻航线",
    wayline_type: "waypoint",
    distance: 2200,
    duration: 750,
    finish_action: "return_home",
    fingerprint: "m3n4o5-leigongping-patrol",
    create_time: 1720000000000,
    update_time: 1720000000000,
  },
];

export async function getWaylineListMock(
  _group_id: string,
  opts: { page?: number; page_size?: number; key?: string } = {},
): Promise<GetWaylinesResult> {
  await new Promise((r) => setTimeout(r, 300));
  let list = opts.key ? MOCK_WAYLINES.filter((w) => w.name?.includes(opts.key!)) : MOCK_WAYLINES;
  const page = opts.page ?? 1;
  const page_size = opts.page_size ?? 20;
  return {
    pagination: { page, page_size, total: list.length },
    list: list.slice((page - 1) * page_size, page * page_size),
  };
}

export async function getWaylineListApiMock(
  group_id: string,
  opts: { page?: number; page_size?: number; key?: string } = {},
): Promise<GetWaylinesResult> {
  const { apiGetMock } = await import("./client");
  return apiGetMock<GetWaylinesResult>(`/map/sdk/v1/groups/${group_id}/waylines`, {
    page: opts.page ?? 1,
    page_size: opts.page_size ?? 20,
    key: opts.key,
  });
}

export async function getWaylinesMock(
  mode: "static" | "api",
  group_id: string,
  opts: { page?: number; page_size?: number; key?: string } = {},
): Promise<GetWaylinesResult> {
  if (mode === "static") return getWaylineListMock(group_id, opts);
  if (mode === "api") return getWaylineListApiMock(group_id, opts);
  throw new Error(`Mock mode "${String(mode)}" not supported for waylines`);
}
