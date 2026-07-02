<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import DeviceCard from "$lib/components/DeviceCard.svelte";
  import UserList from "$lib/components/UserList.svelte";
  import FlipNumber from "$lib/components/FlipNumber.svelte";
  import type { Device } from "$lib/types/device";
  import type { User } from "$lib/types/user";
  let { data }: { data: { group_id: string; all_devices: Device[]; users: User[] } } = $props();
</script>

<div class="page-container">
  <div class="dashboard">
  <div class="titleArea">
    <h1 class="dashboard-title">Group #{data.group_id}</h1>
    <span class="flip-wrap"
      >[<FlipNumber value={data.all_devices.length} />]</span
    >
    <button onclick={invalidateAll} class="reload">↻</button>
  </div>

  <div class="userArea">
    <UserList users={data.users} />
  </div>

  <div class="deviceArea">
    <ul class="device-list">
      {#each data.all_devices as device, index}
        <DeviceCard {device} />
      {:else}
        <div class="empty-state">No device currently!</div>
      {/each}
    </ul>
  </div>
  </div>
</div>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .dashboard {
    font-family: "Noto Sans", "Courier News";
    margin: 2rem 0;
    display: grid;
    grid-template-areas:
      "top"
      "users"
      "device";
    padding: var(--space-xl);
    gap: 1rem;
    background: var(--bg-page);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-card);
  }

  .dashboard-title {
    color: var(--text-heading);
    font-size: 5rem;
  }

  .flip-wrap {
    display: inline-flex;
    align-items: center;
    font-size: 2.5rem;
    color: var(--text-muted);
  }

  .reload {
    font-size: 3rem;
    border: 1px solid var(--border-card);
    border-radius: var(--radius-md);
    background: var(--bg-subtle);
    color: var(--text-muted);
    padding: 0 14px;
    transition: all 0.15s ease;
    cursor: pointer;
  }

  .reload:hover {
    background: var(--border-light);
    border-color: var(--border-hover);
  }

  .reload:active {
    background: var(--border-card);
    transform: translateY(1px);
  }

  .device-list {
    display: flex;
    flex-flow: row wrap;
    gap: 1rem;
    list-style: none;
    justify-content: center;
  }

  .empty-state {
    padding: var(--space-3xl);
    text-align: center;
    color: var(--text-faint);
    font-size: 1.2rem;
    border: 2px dashed var(--border-card);
    border-radius: var(--radius-lg);
  }

  .titleArea {
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-area: top;
  }

  .userArea {
    grid-area: users;
  }

  .deviceArea {
    grid-area: device;
  }
</style>
