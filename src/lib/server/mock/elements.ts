import type { GetElementsResult } from "$lib/types/element";

// ── 贵州茗峰农业 — 地图元素（起降点 / 作业区）───────

export const MOCK_ELEMENTS = [
  {
    id: "el-9001",
    name: "湄潭茶园 A 区起降点",
    content: { type: "Polygon", area_ha: 3.2, crop: "茶" },
    created_nickname: "陈连山",
    create_time: 1717200000000,
    update_time: 1722000000000,
  },
  {
    id: "el-9002",
    name: "梵净山南坡备降点",
    content: { type: "Point", altitude_m: 1280 },
    created_nickname: "龙云",
    create_time: 1718500000000,
    update_time: 1718500000000,
  },
  {
    id: "el-9003",
    name: "赤水河谷运输补给站",
    content: { type: "Point", altitude_m: 320, note: "FC30 专用" },
    created_nickname: "杨梅",
    create_time: 1722000000000,
    update_time: 1725100000000,
  },
  {
    id: "el-9004",
    name: "雷公坪瞭望点",
    content: { type: "Point", altitude_m: 2178 },
    created_nickname: "吴骁",
    create_time: 1720000000000,
  },
  {
    id: "el-9005",
    name: "都匀毛尖茶园 B 区",
    content: { type: "Polygon", area_ha: 5.8, crop: "茶" },
    created_nickname: "何芳",
    create_time: 1723500000000,
    update_time: 1726000000000,
  },
];

export async function getElementListMock(
  _group_id: string,
  opts: { page?: number; page_size?: number } = {},
): Promise<GetElementsResult> {
  await new Promise((r) => setTimeout(r, 300));
  const page = opts.page ?? 1;
  const page_size = opts.page_size ?? 20;
  return {
    pagination: { page, page_size, total: MOCK_ELEMENTS.length },
    list: MOCK_ELEMENTS.slice((page - 1) * page_size, page * page_size),
  };
}

export async function getElementListApiMock(
  group_id: string,
  opts: { page?: number; page_size?: number } = {},
): Promise<GetElementsResult> {
  const { apiGetMock } = await import("./client");
  return apiGetMock<GetElementsResult>(`/map/sdk/v1/groups/${group_id}/elements`, {
    page: opts.page ?? 1,
    page_size: opts.page_size ?? 20,
  });
}

export async function getElementsMock(
  mode: "static" | "api",
  group_id: string,
  opts: { page?: number; page_size?: number } = {},
): Promise<GetElementsResult> {
  if (mode === "static") return getElementListMock(group_id, opts);
  if (mode === "api") return getElementListApiMock(group_id, opts);
  throw new Error(`Mock mode "${mode}" not supported for elements`);
}
