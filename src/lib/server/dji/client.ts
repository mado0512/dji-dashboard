import { DJI_AK, DJI_BASE_URL, DJI_SK } from "$env/static/private";
import { createHmac } from "node:crypto";

const BASE = DJI_BASE_URL ?? "https://ta-api-cn.dji.com";

function sign(method: string): Record<string, string> {
  const ts = String(Date.now());
  const nonce = crypto.randomUUID();
  const sig = createHmac("sha256", DJI_SK)
    .update(`${DJI_AK}+${method}+${ts}+${nonce}`)
    .digest("hex");

  return {
    "X-DJI-Signature": sig,
    "X-DJI-Timestamp": ts,
    "X-DJI-Nonce": nonce,
  };
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

/** 生产环境 DJI Cloud API GET 请求（HMAC-SHA256 签名） */
export async function apiGet<T>(
  path: string,
  params?: Record<string, string | number | undefined>,
): Promise<T> {
  const url = new URL(path, BASE);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }

  const res = await fetch(url, {
    headers: { Accept: "*/*", ...sign("GET") },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  const body: ApiResponse<T> = await res.json();
  if (body.code !== 0) {
    throw new Error(`API error [${body.code}]: ${body.message}`);
  }

  return body.data;
}
