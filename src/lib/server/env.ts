import { DJI_AK, DJI_BASE_URL, DJI_MOCK, DJI_SK, DATABASE_URL } from "$env/static/private";

/** 校验后的环境变量，对所有 +page.server.ts 暴露 */
export interface Env {
  DATABASE_URL: string;
  DJI_AK: string;
  DJI_SK: string;
  DJI_BASE_URL: string;
  /** "static" | "api" | "prod" */
  DJI_MOCK: string;
}

/** 读取并校验环境变量，缺少必填项时抛错 */
export function parseEnv(): Env {
  const missing: string[] = [];

  if (!DATABASE_URL) missing.push("DATABASE_URL");
  if (!DJI_AK) missing.push("DJI_AK");
  if (!DJI_SK) missing.push("DJI_SK");

  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(", ")}`);
  }

  return {
    DATABASE_URL,
    DJI_AK,
    DJI_SK,
    DJI_BASE_URL: DJI_BASE_URL ?? "https://ta-api-cn.dji.com",
    DJI_MOCK: DJI_MOCK || "prod",
  };
}
