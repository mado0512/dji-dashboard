<script lang="ts">
  import type { Wayline } from "$lib/types";
  import WaylineCard from "./WaylineCard.svelte";
  import WaylineHoverCard from "./WaylineHoverCard.svelte";

  const { waylines }: { waylines: Wayline[] } = $props();

  let selectedWaylineId = $derived(waylines[0]?.wayline_id);

  function select(id: string | undefined) {
    if (id) selectedWaylineId = id;
  }
</script>

<div id="dashboard" class="flex gap-4">
  <div id="cardlist" class="flex flex-col gap-2 flex-1 pl-3">
    {#each waylines as wayline (wayline.wayline_id)}
      {@const selected = wayline.wayline_id === selectedWaylineId}
      <div
        class="transition cursor-pointer {selected
          ? 'opacity-100 -translate-2.5'
          : 'opacity-15 hover:opacity-30'}"
        role="option"
        aria-selected={selected}
        tabindex="0"
        onmousedown={() => select(wayline.wayline_id)}
      >
        <WaylineCard {wayline} />
      </div>
    {/each}
  </div>

  <div class="flex-1">
    <WaylineHoverCard
      wayline={waylines.find((w) => w.wayline_id === selectedWaylineId)!}
    />
  </div>
</div>
