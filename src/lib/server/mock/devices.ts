import type { GetDevicesResult } from "$lib/types/device";

// ── Fictional setting: 贵州茗峰农业科技有限公司 ─────
// 茶树植保 + 山区测绘 + 应急运输
// ─────────────────────────────────────────────────────

export const MOCK_DEVICES = [
  {
    sn: "3UJ8K9A2B001",
    device_nickname: "M350-茶岭一号",
    device_model_key: "M350 RTK",
    device_model_class: "aircraft",
    binding_time: 1717200000000,
  },
  {
    sn: "4WK7M3D5R002",
    device_nickname: "禅岭 RC",
    device_model_key: "RC Plus",
    device_model_class: "remote_controller",
    binding_time: 1717200000000,
  },
  {
    sn: "7FN2P6L8E003",
    device_nickname: "M3E-雾岭巡检",
    device_model_key: "Mavic 3E",
    device_model_class: "aircraft",
    binding_time: 1718500000000,
  },
  {
    sn: "9XH4V1T3Q004",
    device_nickname: "M3T-雷公山",
    device_model_key: "Mavic 3T",
    device_model_class: "aircraft",
    binding_time: 1719800000000,
  },
  {
    sn: "2BR6Y8C0J005",
    device_nickname: "FC30-赤水",
    device_model_key: "FlyCart 30",
    device_model_class: "aircraft",
    binding_time: 1722000000000,
  },
];

export async function getDeviceListMock(_group_id: string): Promise<GetDevicesResult> {
  await new Promise((r) => setTimeout(r, 250));
  return { list: MOCK_DEVICES };
}

export async function getDeviceListApiMock(group_id: string): Promise<GetDevicesResult> {
  const { apiGetMock } = await import("./client");
  return apiGetMock<GetDevicesResult>(`/manage/sdk/v1/groups/${group_id}/devices`);
}

export async function getDevicesMock(
  mode: "static" | "api",
  group_id: string,
): Promise<GetDevicesResult> {
  if (mode === "static") return getDeviceListMock(group_id);
  if (mode === "api") return getDeviceListApiMock(group_id);
  throw new Error(`Mock mode "${mode}" not supported for devices`);
}
