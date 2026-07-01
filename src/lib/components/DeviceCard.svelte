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
  class="device-card group"
  class:active={hovered}
  class:drone={icon === "drone"}
  class:rc={icon === "rc"}
  onclick={copySn}
  onmouseenter={() => (hovered = true)}
  onmouseleave={() => (hovered = false)}
>
  {#if icon === "drone"}
    <img src={droneIcon} alt="Icon of drone" class="device-icon" />
  {:else if icon === "rc"}
    <img src={rcIcon} alt="Icon of remote controller" class="device-icon" />
  {/if}
  <h2 class="device-card-title">{device.device_nickname}</h2>
  <div class="device-card-description group">
    <span class="model-sn">{device.sn}</span>
    <span
      class="model-key group-hover:text-orange-500 text-neutral-500 font-bitcount font-extralight
    ">{device.device_model_key}</span
    >
  </div>

  {#if copied}
    <span class="copied-toast">sn copied</span>
  {/if}

  {#if hovered}
    <DeviceHoverCard {device} />
  {/if}
</button>

<style>
  .device-card {
    box-sizing: border-box;
    position: relative;
    list-style: none;
    background: linear-gradient(135deg, var(--bg-page), var(--bg-card-hover));
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-card);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 250px;
    padding: var(--space-sm);
    transition:
      box-shadow 0.2s ease,
      transform 0.15s ease,
      border-color 0.2s ease;
    cursor: pointer;
    overflow: hidden;
  }

  .model-sn {
    @apply group-hover:opacity-80 underline;
  }

  .device-card:hover .device-icon {
    fill: var(--text-heading);
  }

  .device-card-title {
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-heading);
    margin: 0;
  }

  .device-card-description {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.15rem;
  }

  .model-sn {
    font-size: 0.8rem;
    color: var(--text-subtle);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    opacity: 0.2;
    transition: all 0.15s ease;
    font-family: "Courier New", Courier, monospace;
  }

  .copied-toast {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150%;
    padding: 20rem;
    /* background: white; */
    color: var(--text-subtle);
    font-size: 1.2rem;
    border-radius: var(--radius-sm);
    pointer-events: none;
    animation: toast-pop 1s ease-out forwards;
    /* letter-spacing: 1.1px; */
    font-family: "Courier New", Courier, monospace;
  }

  @keyframes toast-pop {
    0% {
      opacity: 0;
      backdrop-filter: blur(0px);
      transform: translate(-50%, -50%) scale(0.8);
    }
    15% {
      opacity: 1;
      backdrop-filter: blur(20px);
      transform: translate(-50%, -50%) scale(1);
    }
    70% {
      opacity: 1;
      backdrop-filter: blur(20px);
    }
    100% {
      opacity: 0;
      backdrop-filter: blur(0px);
    }
  }

  .device-icon {
    @apply absolute scale-[4.5] opacity-5 -rotate-12;
  }
</style>
