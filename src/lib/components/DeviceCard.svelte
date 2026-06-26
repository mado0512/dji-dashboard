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
  class="device-card"
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
  <div class="device-card-description">
    <span class="model-sn">{device.sn}</span>
    <span class="model-key">{device.device_model_key}</span>
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

    &:hover .model-sn {
      opacity: 0.8;
      text-decoration: underline;
    }
  }

  .device-card.active {
    z-index: 10; /* ← 修复：抬升当前卡片的层叠上下文，浮层不被兄弟遮挡 */
    box-shadow: var(--elevation-2);
    border-color: var(--border-hover);
    transform: translateY(-2px);
  }

  .device-icon {
    flex-shrink: 0;
    width: 1.2rem;
    height: 1.2rem;
    fill: var(--text-muted);
    transition: fill 0.45s ease;
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
    font-family: 'Courier New', Courier, monospace;
  }

  .model-key {
    font-size: 1.05rem;
    font-weight: 300;
    color: var(--text-muted);
    font-family: "Bitcount Single";
    transition: color 0.45s ease;
  }

  .device-card:hover .model-key {
    color: orangered;
    filter: saturate(0.8);
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
    font-family: 'Courier New', Courier, monospace;
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
    position: absolute;
    scale: 4.5;
    transform: translateX(5px) rotateZ(-30deg);
    opacity: 0.08;
  }
</style>
