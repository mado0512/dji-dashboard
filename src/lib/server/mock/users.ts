import type { GetUsersResult } from "$lib/types/user";

// ── 贵州茗峰农业科技 — 团队成员 ──────────────────────

export const MOCK_USERS = [
  {
    user_id: "u-001",
    account: "lian.chen",
    nick_name: "陈连山",
    role: "group-admin" as const,
    create_time: 1704067200000,
  },
  {
    user_id: "u-002",
    account: "yun.long",
    nick_name: "龙云",
    role: "group-member" as const,
    create_time: 1706745600000,
  },
  {
    user_id: "u-003",
    account: "mei.yang",
    nick_name: "杨梅",
    role: "group-member" as const,
    create_time: 1709251200000,
  },
  {
    user_id: "u-004",
    account: "xiao.wu",
    nick_name: "吴骁",
    role: "group-member" as const,
    create_time: 1711929600000,
  },
  {
    user_id: "u-005",
    account: "fang.he",
    nick_name: "何芳",
    role: "group-member" as const,
    create_time: 1714521600000,
  },
];

export async function getUserListMock(
  _group_id: string,
  opts: { page?: number; page_size?: number; key?: string } = {},
): Promise<GetUsersResult> {
  await new Promise((r) => setTimeout(r, 300));

  let list = MOCK_USERS;
  if (opts.key) {
    list = list.filter((u) => u.nick_name?.includes(opts.key!));
  }

  const page = opts.page ?? 1;
  const page_size = opts.page_size ?? 20;
  const start = (page - 1) * page_size;

  return {
    pagination: { page, page_size, total: list.length },
    list: list.slice(start, start + page_size),
  };
}

export async function getUserListApiMock(
  group_id: string,
  opts: { page?: number; page_size?: number; key?: string } = {},
): Promise<GetUsersResult> {
  const { apiGetMock } = await import("./client");
  return apiGetMock<GetUsersResult>(`/manage/sdk/v1/groups/${group_id}/users`, {
    page: opts.page ?? 1,
    page_size: opts.page_size ?? 20,
    key: opts.key,
  });
}

export async function getUsersMock(
  mode: "static" | "api",
  group_id: string,
  opts: { page?: number; page_size?: number; key?: string } = {},
): Promise<GetUsersResult> {
  if (mode === "static") return getUserListMock(group_id, opts);
  if (mode === "api") return getUserListApiMock(group_id, opts);
  throw new Error(`Mock mode "${mode}" not supported for users`);
}
