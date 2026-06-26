<script lang="ts">
  import type { Wayline } from "$lib/types";
  import WaylineCard from "./WaylineCard.svelte";
  import WaylineHoverCard from "./WaylineHoverCard.svelte";

  const { waylines }: { waylines: Wayline[] } = $props();

  let activeWaylineId = $derived(waylines[0]?.wayline_id);

  function activate(id: string | undefined) {
    if (id) activeWaylineId = id;
  }
</script>

<div class="wayline-dashboard">
  <h2>Wayline dashboard</h2>
  <div class="display-container">
    <div class="wayline-card-list">
      {#each waylines as wayline (wayline.wayline_id)}
        <div
          class="wayline-card-wrapper"
          class:active={wayline.wayline_id === activeWaylineId}
          role="option"
          aria-selected={wayline.wayline_id === activeWaylineId}
          tabindex="0"
          onmousedown={() => activate(wayline.wayline_id)}
        >
          <WaylineCard {wayline} />
        </div>
      {/each}
    </div>
    <div class="hover-card-display">
      <WaylineHoverCard
        wayline={waylines.find((w) => w.wayline_id === activeWaylineId)!}
      />
    </div>
  </div>
</div>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .wayline-dashboard {
    display: flex;
    gap: 1rem;
    flex-direction: column;
  }
  .display-container {
    display: flex;
    flex-flow: row nowrap;
    gap: 1rem;
  }

  .wayline-card-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .wayline-card-wrapper {
    border-left: 3px solid transparent;
    transition:
      opacity 0.3s ease,
      border-color 0.3s ease,
      transform 0.3s ease;
    padding-left: 0.5rem;
  }

  .wayline-card-wrapper.active {
    border-left-color: var(--border-accent);
    transform: translateX(-10px) translateY(-10px);
  }

  .wayline-card-wrapper:not(.active) {
    opacity: 0.15;

    &:hover {
      opacity: 0.3;
    }
  }

  .hover-card-display {
    flex: 1.5;
  }
</style>
