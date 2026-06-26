import type { User, GetUsersResult } from "$lib/types/user";
import { apiGet } from "./client";
import { mockMode, getUsersMock } from "$lib/server/mock";

// ── Production ─────────────────────────────────────────

export async function getUserList(
  group_id: string,
  opts: { page?: number; page_size?: number; key?: string } = {},
): Promise<GetUsersResult> {
  return apiGet<GetUsersResult>(`/manage/sdk/v1/groups/${group_id}/users`, {
    page: opts.page ?? 1,
    page_size: opts.page_size ?? 20,
    key: opts.key,
  });
}

// ── Mock-switcher ──────────────────────────────────────

export async function getUsers(
  group_id: string,
  opts: { page?: number; page_size?: number; key?: string } = {},
): Promise<GetUsersResult> {
  const mode = mockMode();
  if (mode !== "prod") return getUsersMock(mode, group_id, opts);
  return getUserList(group_id, opts);
}

// ── All pages ──────────────────────────────────────────

export async function getAllUsers(
  group_id: string,
  opts: { page_size?: number; key?: string } = {},
): Promise<User[]> {
  const PAGE_SIZE = opts.page_size ?? 100;
  const first = await getUsers(group_id, { ...opts, page: 1, page_size: PAGE_SIZE });
  const all = [...first.list];

  const totalPages = Math.ceil(first.pagination.total / PAGE_SIZE);
  for (let page = 2; page <= totalPages; page++) {
    const { list } = await getUsers(group_id, { ...opts, page, page_size: PAGE_SIZE });
    all.push(...list);
  }

  return all;
}
