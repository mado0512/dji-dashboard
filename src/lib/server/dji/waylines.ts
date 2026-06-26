import type { Wayline, GetWaylinesResult, GetWaylineDetailResult } from "$lib/types/wayline";
import { apiGet } from "./client";
import { mockMode, getWaylinesMock } from "$lib/server/mock";
import { getWaylineDetailMock } from "$lib/mock/wayline-details";

// ── Production ─────────────────────────────────────────

export async function getWaylineList(
  group_id: string,
  opts: { page?: number; page_size?: number; key?: string } = {},
): Promise<GetWaylinesResult> {
  return apiGet<GetWaylinesResult>(`/map/sdk/v1/groups/${group_id}/waylines`, {
    page: opts.page ?? 1,
    page_size: opts.page_size ?? 20,
    key: opts.key,
  });
}

export async function getWaylineDetail(
  group_id: string,
  wayline_id: string,
): Promise<GetWaylineDetailResult> {
  return apiGet<GetWaylineDetailResult>(`/map/sdk/v1/groups/${group_id}/waylines/${wayline_id}`);
}

// ── Mock-switchers ─────────────────────────────────────

export async function getWaylines(
  group_id: string,
  opts: { page?: number; page_size?: number; key?: string } = {},
): Promise<GetWaylinesResult> {
  const mode = mockMode();
  if (mode !== "prod") return getWaylinesMock(mode, group_id, opts);
  return getWaylineList(group_id, opts);
}

export async function getWaylineDetailSwitched(
  group_id: string,
  wayline_id: string,
): Promise<GetWaylineDetailResult> {
  const mode = mockMode();
  if (mode !== "prod") return getWaylineDetailMock(wayline_id);
  return getWaylineDetail(group_id, wayline_id);
}

// ── All pages ──────────────────────────────────────────

export async function getAllWaylines(
  group_id: string,
  opts: { page_size?: number; key?: string } = {},
): Promise<Wayline[]> {
  const PAGE_SIZE = opts.page_size ?? 100;
  const first = await getWaylines(group_id, { ...opts, page: 1, page_size: PAGE_SIZE });
  const all = [...first.list];

  const totalPages = Math.ceil(first.pagination.total / PAGE_SIZE);
  for (let page = 2; page <= totalPages; page++) {
    const { list } = await getWaylines(group_id, { ...opts, page, page_size: PAGE_SIZE });
    all.push(...list);
  }
  return all;
}
