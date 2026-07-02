<script lang="ts">
  import droneIcon from "$lib/assets/drone_icon.svg";
  import rcIcon from "$lib/assets/rc_icon.svg";
  import type { Device } from "$lib/types/device";
  import DeviceHoverCard from "./DeviceHoverCard.svelte";

  const { device }: { device: Device } = $props();
  let hovered = $state(false);
  let copied = $state(false);

  const icon = $derived(
    device.device_model_class === "aircraft"
      ? "drone"
      : device.device_model_class === "remote_controller"
        ? "rc"
        : null,
  );

  async function copySn() {
    if (!device.sn) return;
    await navigator.clipboard.writeText(device.sn);
    copied = true;
    setTimeout(() => (copied = false), 1000);
  }
</script>

<button
  class="card group w-65 justify-between relative overflow-hidden"
  class:active={hovered}
  class:drone={icon === "drone"}
  class:rc={icon === "rc"}
  onclick={copySn}
  onmouseenter={() => (hovered = true)}
  onmouseleave={() => (hovered = false)}
>
  <img
    class="absolute scale-[4.5] opacity-5 -rotate-12"
    src={icon === "drone" ? droneIcon : rcIcon}
    alt="device icon"
  />
  <h2 class="font-bold">{device.device_nickname}</h2>
  <div class="group flex flex-col justify-end gap-1">
    <span
      class="text-sm font-courier group-hover:opacity-80 group-hover:underline underline-offset-1 opacity-20 transition-all ease-in-out text-neutral-500 tracking-wide"
      >{device.sn}</span
    >
    <span
      class="group-hover:text-orange-600 text-neutral-500 font-bitcount font-extralight
    ">{device.device_model_key}</span
    >
  </div>

  {#if copied}
    <div
      class="hidden absolute inset-0 text-center group-hover:center backdrop-blur-sm text-2xl font-courier font-medium"
    >
      <span>sn copied</span>
    </div>
  {/if}

  {#if hovered}
    <DeviceHoverCard {device} />
  {/if}
</button>
