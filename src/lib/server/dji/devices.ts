import type { Device, GetDevicesResult } from "$lib/types/device";
import { apiGet } from "./client";
import { mockMode, getDevicesMock } from "$lib/server/mock";

// ── Production ─────────────────────────────────────────

export async function getDeviceList(group_id: string): Promise<GetDevicesResult> {
  return apiGet<GetDevicesResult>(`/manage/sdk/v1/groups/${group_id}/devices`);
}

// ── Mock-switcher ──────────────────────────────────────

export async function getDevices(group_id: string): Promise<GetDevicesResult> {
  const mode = mockMode();
  if (mode !== "prod") return getDevicesMock(mode, group_id);
  return getDeviceList(group_id);
}

// ── All ────────────────────────────────────────────────

export async function getAllDevices(group_id: string): Promise<Device[]> {
  const { list } = await getDevices(group_id);
  return list;
}

// ── Legacy alias ───────────────────────────────────────

/** @deprecated 使用 getDevices() */
export const GetDeviceList = getDevices;
