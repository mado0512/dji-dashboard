/** Apifox mock 客户端 — 走本地 mock 服务器，不签名 */
export async function apiGetMock<T>(
  path: string,
  params?: Record<string, string | number | undefined>,
): Promise<T> {
  const mockBase = "http://127.0.0.1:4523/m1/8443452-8213686-default/";
  const url = new URL(path.replace(/^\//, ""), mockBase);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }
  const res = await fetch(url, { headers: { Accept: "*/*" } });
  if (!res.ok) {
    throw new Error(`Mock HTTP ${res.status}: ${res.statusText}`);
  }
  const body: { code: number; message: string; data: T } = await res.json();
  return body.data;
}
