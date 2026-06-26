import type { Pagination } from "./pagination";

export interface MapElement {
  id?: string;
  name?: string;
  content?: Record<string, unknown>;
  created_nickname?: string;
  create_time?: number;
  update_time?: number;
}

export interface GetElementsResult {
  pagination: Pagination;
  list: MapElement[];
}
