<script lang="ts">
  import { Route, Satellite } from "@lucide/svelte";
  import WaylineStats from "./WaylineStats.svelte";
  import type { Wayline } from "$lib/types/wayline";

  const { wayline }: { wayline: Wayline } = $props();

  const isMapping = $derived(wayline.wayline_type === "mapping");
</script>

<button class="card w-full justify-between gap-3 flex-1">
  <div class="flex flex-row items-center gap-2">
    {#if isMapping}
      <Satellite
        size={20}
        strokeWidth={1.5}
        class="shrink-0 text-neutral-400"
      />
    {:else}
      <Route size={20} strokeWidth={1.5} class="shrink-0 text-neutral-400" />
    {/if}

    <hgroup class="flex flex-col gap-0 items-start">
      <h4 class="text-nowrap font-semibold">{wayline.name}</h4>
      <span class="text-sm text-neutral-400 tracking-wide"
        >{isMapping ? "测绘" : "航点"}</span
      >
    </hgroup>
  </div>

  <WaylineStats {wayline} />
</button>
