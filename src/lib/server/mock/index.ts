import { DJI_MOCK } from "$env/static/private";
export { apiGetMock } from "./client";

export type MockMode = "static" | "api" | "prod";

export function mockMode(): MockMode {
  if (DJI_MOCK === "static") return "static";
  if (DJI_MOCK === "api") return "api";
  return "prod";
}

// ── Barrel re-exports — each domain's mock resolver ───

export { getDevicesMock } from "./devices";
export { getUsersMock } from "./users";
export { getElementsMock } from "./elements";
export { getWaylinesMock } from "./waylines";
export { getTasksMock, getStatisticsMock, getTrackMock } from "./tasks";
