<script lang="ts">
  import { Route, Satellite } from "@lucide/svelte";
  import type { Wayline } from "$lib/types/wayline";

  const { wayline }: { wayline: Wayline } = $props();

  const isMapping = $derived(wayline.wayline_type === "mapping");
  const durationMin = $derived(Math.round((wayline.duration ?? 0) / 60));
</script>

<li class="wayline-card" class:mapping={isMapping}>
  <div class="wayline-left">
    {#if isMapping}
      <Satellite />
    {:else}
      <Route />
    {/if}

    <div class="wayline-info">
      <span class="wayline-name">{wayline.name}</span>
      <span class="wayline-type-badge">{isMapping ? "测绘" : "航点"}</span>
    </div>
  </div>

  <div class="wayline-stats">
    <span class="stat">
      <span class="stat-value"
        >{((wayline.distance ?? 0) / 1000).toFixed(1)}</span
      >
      <span class="stat-label">km</span>
    </span>
    <span class="stat-divider"></span>
    <span class="stat">
      <span class="stat-value">{durationMin}</span>
      <span class="stat-label">min</span>
    </span>
    <span class="stat-divider"></span>
    <span class="stat">
      <span class="stat-value finish"
        >{wayline.finish_action === "return_home" ? "返航" : "降落"}</span
      >
    </span>
  </div>
</li>

<style>
  .wayline-card {
    position: relative;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* width: 100%; */
    padding: 0.6rem 0.9rem;
    background: linear-gradient(135deg, var(--bg-page), var(--bg-card-hover));
    border: 1px solid var(--border-card);
    border-radius: var(--radius-md);
    transition:
      box-shadow 0.2s ease,
      border-color 0.2s ease;
    cursor: pointer;
  }

  /* .wayline-card.mapping {
    border-left: 3px solid var(--border-accent);
  } */

  .wayline-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .wayline-icon {
    flex-shrink: 0;
    width: 1.3rem;
    height: 1.3rem;
    fill: var(--text-muted);
  }

  .wayline-info {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .wayline-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-heading);
  }

  .wayline-type-badge {
    font-size: 0.7rem;
    color: var(--text-faint);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .wayline-stats {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .stat {
    display: flex;
    align-items: baseline;
    gap: 0.15rem;
  }

  .stat-value {
    font-weight: 700;
    font-size: 1rem;
    color: var(--text-muted);
  }

  .stat-label {
    font-size: 0.7rem;
    color: var(--text-faint);
  }

  .stat-value.finish {
    font-size: 0.8rem;
    color: var(--text-subtle);
  }

  .stat-divider {
    width: 1px;
    height: 1rem;
    background: var(--border-light);
  }
</style>
