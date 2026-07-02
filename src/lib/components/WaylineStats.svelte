<script lang="ts">
  import type { Wayline } from "$lib/types/wayline";
  import StatValue from "./StatValue.svelte";
  const { wayline }: { wayline: Wayline } = $props();

  const durationMin = $derived(Math.round((wayline.duration ?? 0) / 60));

  const formatDistance = $derived(((wayline.distance ?? 0) / 1000).toFixed(1));

  const finishActionString = $derived(
    wayline.finish_action === "return_home" ? "返航" : "降落",
  );
</script>

<div class="center divide-solid divide-x divide-neutral-300">
  <StatValue value={formatDistance} unit="km" />

  <StatValue value={durationMin} unit="min" />

  <StatValue value={finishActionString} />
</div>
