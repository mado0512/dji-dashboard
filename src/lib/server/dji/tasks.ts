import type {
  Task,
  TaskStatistics,
  GetTasksResult,
  GetTrackResult,
  TrackItem,
} from "$lib/types/task";
import { apiGet } from "./client";
import { mockMode, getTasksMock, getStatisticsMock, getTrackMock } from "$lib/server/mock";

// ── Production ─────────────────────────────────────────

export async function getTaskList(
  group_id: string,
  opts: {
    start_time: number;
    end_time: number;
    page?: number;
    page_size?: number;
    status?: number;
    sn?: string;
  },
): Promise<GetTasksResult> {
  return apiGet<GetTasksResult>(`/task/sdk/v1/groups/${group_id}/tasks`, {
    start_time: opts.start_time,
    end_time: opts.end_time,
    page: opts.page ?? 1,
    page_size: opts.page_size ?? 20,
    status: opts.status,
    sn: opts.sn,
  });
}

export async function getTaskStatistics(
  group_id: string,
  task_id: string,
): Promise<TaskStatistics> {
  return apiGet<TaskStatistics>(`/task/sdk/v1/groups/${group_id}/tasks/${task_id}/statistics`);
}

export async function getTaskTrack(group_id: string, task_id: string): Promise<GetTrackResult> {
  return apiGet<GetTrackResult>(`/task/sdk/v1/groups/${group_id}/tasks/${task_id}/track`);
}

// ── Mock-switchers ─────────────────────────────────────

export async function getTasks(
  group_id: string,
  opts: {
    start_time: number;
    end_time: number;
    page?: number;
    page_size?: number;
    status?: number;
    sn?: string;
  },
): Promise<GetTasksResult> {
  const mode = mockMode();
  if (mode !== "prod") return getTasksMock(mode, group_id, opts);
  return getTaskList(group_id, opts);
}

export async function getStatistics(group_id: string, task_id: string): Promise<TaskStatistics> {
  const mode = mockMode();
  if (mode !== "prod") return getStatisticsMock(mode, group_id, task_id);
  return getTaskStatistics(group_id, task_id);
}

export async function getTrack(group_id: string, task_id: string): Promise<GetTrackResult> {
  const mode = mockMode();
  if (mode !== "prod") return getTrackMock(mode, group_id, task_id);
  return getTaskTrack(group_id, task_id);
}

// ── All pages ──────────────────────────────────────────

export async function getAllTasks(
  group_id: string,
  opts: {
    start_time: number;
    end_time: number;
    page_size?: number;
    status?: number;
    sn?: string;
  },
): Promise<Task[]> {
  const PAGE_SIZE = opts.page_size ?? 100;
  const first = await getTasks(group_id, { ...opts, page: 1, page_size: PAGE_SIZE });
  const all = [...first.list];

  const totalPages = Math.ceil(first.pagination.total / PAGE_SIZE);
  for (let page = 2; page <= totalPages; page++) {
    const { list } = await getTasks(group_id, { ...opts, page, page_size: PAGE_SIZE });
    all.push(...list);
  }

  return all;
}

export async function getAllTrack(group_id: string, task_id: string): Promise<TrackItem[]> {
  const { list } = await getTrack(group_id, task_id);
  return list;
}
