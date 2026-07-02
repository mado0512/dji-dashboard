<script lang="ts">
  import { getWaylineDetailMock } from "$lib/mock/wayline-details";
  import type { Wayline } from "$lib/types/wayline";
  import Map from "./Map.svelte";

  const { wayline }: { wayline: Wayline } = $props();

  let map_expanded = $state(false);

  const detail = $derived(getWaylineDetailMock(wayline.wayline_id!));

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
  <button
    class="map-display"
    class:map_expanded
    onclick={() => (map_expanded = !map_expanded)}
  >
    <Map points={detail.data.points} />
  </button>
  <div class="hover-card-row">
    <span class="label">航线 ID</span>
    <span class="value">{wayline.wayline_id ?? "—"}</span>
  </div>
  <div class="hover-card-row">
    <span class="label">创建时间</span>
    <span class="value">{fmtDate(wayline.create_time)}</span>
  </div>
</div>

<svelte:window
  onkeydown={(e) => {
    if (e.key === "Escape") map_expanded = false;
  }}
/>

{#if map_expanded}
  <div
    class="fixed inset-0 z-99 backdrop-blur-xs"
    onclick={() => (map_expanded = false)}
    onkeydown={(e) => {}}
    role="button"
    tabindex="0"
    aria-label="点击或按 Enter 关闭地图"
  ></div>
{/if}

<style>
  .hover-card {
    min-width: unset;
    padding: 0.75rem 1rem;
    background: #fff;
    border-radius: var(--radius-md);
    border: 2px dashed var(--border-accent);
    box-shadow: var(--elevation-3);
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    height: 100%;
    box-sizing: border-box;
    justify-content: flex-end;
  }

  .map-display {
    /* border: 1px solid black; */
    height: 100%;
    border-radius: var(--radius-md);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: scale 0.2s cubic-bezier(0.2, 0, 0, 1);
    overflow: hidden;
    box-shadow: var(--elevation-2);
    margin: var(--space-sm);
    border: 1px solid var(--border-accent);
    transition: all 0.3s ease;
    &:not(.map_expanded):hover {
      scale: 1.05;
    }
    cursor: zoom-in;
  }

  .map_expanded {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80vw;
    height: 60vh;
    z-index: 100;
    box-shadow: var(--elevation-4);
    border-radius: var(--radius-lg);
    cursor: default;
    /* scale: 1 !important; */
  }

  .hover-card-row {
    display: flex;
    justify-content: space-between;
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
</style>
