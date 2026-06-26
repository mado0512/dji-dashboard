<script lang="ts">
  import DeviceCard from "$lib/components/DeviceCard.svelte";
  import List from "$lib/components/List.svelte";
  import UserCard from "$lib/components/UserCard.svelte";
  import WaylineDashboard from "$lib/components/WaylineDashboard.svelte";

  const { data } = $props();
</script>

<div class="container">
  <div class="cardList userCardList">
    <h2 class="list-title">Users</h2>
    {#each data.users as user (user.user_id)}
      <li class="card"><UserCard {user} /></li>
    {/each}
  </div>

  <div class="cardList deviceCardList">
    <h2 class="list-title">Devices</h2>
    {#each data.devices as device (device.sn)}
      <li class="card"><DeviceCard {device} /></li>
    {/each}
  </div>
<!-- 
  <List entity="Elements" items={data.mapElements} fn={(e) => e.name} /> -->

  <WaylineDashboard waylines={data.waylines} />
</div>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: var(--space-lg);
  }

  .container > :global(*) {
    flex: 1 1 200px;
  }

  /* vertical ruler between sections */
  .container > :not(:first-child) {
    border-left: 1px solid var(--border-light);
    padding-left: var(--space-lg);
  }

  .cardList {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    list-style: none;

    & .list-title {
      align-self: flex-start;
    }
  }

  /* blur all siblings when any card is hovered */
  .cardList:has(.card:hover) .card:not(:hover) {
    filter: blur(2px);
  }

  .card {
    transition: filter 0.3s ease;
  }
</style>
