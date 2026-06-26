import type { MapElement, GetElementsResult } from "$lib/types/element";
import { apiGet } from "./client";
import { mockMode, getElementsMock } from "$lib/server/mock";

// ── Production ─────────────────────────────────────────

export async function getElementList(
  group_id: string,
  opts: { page?: number; page_size?: number } = {},
): Promise<GetElementsResult> {
  return apiGet<GetElementsResult>(`/map/sdk/v1/groups/${group_id}/elements`, {
    page: opts.page ?? 1,
    page_size: opts.page_size ?? 20,
  });
}

// ── Mock-switcher ──────────────────────────────────────

export async function getElements(
  group_id: string,
  opts: { page?: number; page_size?: number } = {},
): Promise<GetElementsResult> {
  const mode = mockMode();
  if (mode !== "prod") return getElementsMock(mode, group_id, opts);
  return getElementList(group_id, opts);
}

// ── All pages ──────────────────────────────────────────

export async function getAllElements(
  group_id: string,
  opts: { page_size?: number } = {},
): Promise<MapElement[]> {
  const PAGE_SIZE = opts.page_size ?? 100;
  const first = await getElements(group_id, { page: 1, page_size: PAGE_SIZE });
  const all = [...first.list];

  const totalPages = Math.ceil(first.pagination.total / PAGE_SIZE);
  for (let page = 2; page <= totalPages; page++) {
    const { list } = await getElements(group_id, { page, page_size: PAGE_SIZE });
    all.push(...list);
  }

  return all;
}
