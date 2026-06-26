<script lang="ts">
  import type { Device } from "$lib/types/device";

  const { device }: { device: Device } = $props();

  function fmtDate(ts?: number): string {
    if (!ts) return "—";
    return new Date(ts).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
</script>

<div class="hover-card">
  <div class="hover-card-row">
    <span class="label">SN</span>
    <span class="value">{device.sn ?? "—"}</span>
  </div>
  <div class="hover-card-row">
    <span class="label">型号</span>
    <span class="value">{device.device_model_key ?? "—"}</span>
  </div>
  <div class="hover-card-row">
    <span class="label">绑定时间</span>
    <span class="value">{fmtDate(device.binding_time)}</span>
  </div>
  <div class="hover-card-row">
    <span class="label">入库时间</span>
    <span class="value">{fmtDate(device.created_at ? new Date(device.created_at).getTime() : undefined)}</span>
  </div>
</div>

<style>
  * {
    box-sizing: border-box;
  }
  .hover-card {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    z-index: 10;
    padding: var(--space-md) var(--space-lg);
    background: #fff;
    border-radius: var(--radius-md);
    border: 1px solid var(--border-card);
    border-style: dashed;
    box-shadow: var(--elevation-3);
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    animation: float-in 0.18s ease-out;
    width: 250px;
  }

  .hover-card-row {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    font-size: 0.85rem;
  }

  .hover-card-row .label {
    color: var(--text-subtle);
    font-weight: 500;
    white-space: nowrap;
  }

  .hover-card-row .value {
    color: var(--text-heading);
    font-weight: 600;
    text-align: right;
  }

  @keyframes float-in {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0);     }
  }
</style>
