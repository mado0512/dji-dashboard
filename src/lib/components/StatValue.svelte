<script lang="ts">
  const { value = "0", unit }: { value: string | number; unit?: string } =
    $props();
</script>

<div>
  <em class="text-neutral-500 font-bold">{value}</em>
  <span class="text-neutral-400 font-normal">{unit}</span>
</div>
