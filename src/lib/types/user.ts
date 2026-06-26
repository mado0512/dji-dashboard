import type { Pagination } from "./pagination";

export interface User {
  /** 人员 ID，唯一 */
  user_id?: string;
  /** 人员登录所用账号 */
  account?: string;
  /** 人员昵称 */
  nick_name?: string;
  /** 人员角色 */
  role?: "group-admin" | "group-member";
  /** 人员加入时间，13 位时间戳 */
  create_time?: number;
}

export interface GetUsersResult {
  pagination: Pagination;
  list: User[];
}
