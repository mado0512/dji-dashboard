<script lang="ts">
  import type { Wayline } from "$lib/types/wayline";

  const { wayline }: { wayline: Wayline } = $props();

  const isMapping = $derived(wayline.wayline_type === "mapping");
  const durationMin = $derived(Math.round((wayline.duration ?? 0) / 60));
</script>

<li class="wayline-card" class:mapping={isMapping}>
  <div class="wayline-left">
    {#if isMapping}
      <svg
        class="wayline-icon"
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        ><path
          d="M240-280h480L570-480 450-320l-90-120-120 160Zm0-200q100 0 170-70t70-170h-68q0 72-50 122t-122 50v68Zm0-136q43 0 72.5-30.5T342-720H240v104Zm-40 496q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0 0v-560 560Z"
        /></svg
      >
    {:else}
      <svg
        class="wayline-icon"
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        ><path
          d="M247-167q-47-47-47-113v-327q-35-13-57.5-43.5T120-720q0-50 35-85t85-35q50 0 85 35t35 85q0 39-22.5 69.5T280-607v327q0 33 23.5 56.5T360-200q33 0 56.5-23.5T440-280v-400q0-66 47-113t113-47q66 0 113 47t47 113v327q35 13 57.5 43.5T840-240q0 50-35 85t-85 35q-50 0-85-35t-35-85q0-39 22.5-70t57.5-43v-327q0-33-23.5-56.5T600-760q-33 0-56.5 23.5T520-680v400q0 66-47 113t-113 47q-66 0-113-47Zm-7-513q17 0 28.5-11.5T280-720q0-17-11.5-28.5T240-760q-17 0-28.5 11.5T200-720q0 17 11.5 28.5T240-680Zm480 480q17 0 28.5-11.5T760-240q0-17-11.5-28.5T720-280q-17 0-28.5 11.5T680-240q0 17 11.5 28.5T720-200ZM240-720Zm480 480Z"
        /></svg
      >
    {/if}

    <div class="wayline-info">
      <span class="wayline-name">{wayline.name}</span>
      <span class="wayline-type-badge">{isMapping ? "测绘" : "航点"}</span>
    </div>
  </div>

  <div class="wayline-stats">
    <span class="stat">
      <span class="stat-value"
        >{((wayline.distance ?? 0) / 1000).toFixed(1)}</span
      >
      <span class="stat-label">km</span>
    </span>
    <span class="stat-divider"></span>
    <span class="stat">
      <span class="stat-value">{durationMin}</span>
      <span class="stat-label">min</span>
    </span>
    <span class="stat-divider"></span>
    <span class="stat">
      <span class="stat-value finish"
        >{wayline.finish_action === "return_home" ? "返航" : "降落"}</span
      >
    </span>
  </div>
</li>

<style>
  .wayline-card {
    position: relative;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* width: 100%; */
    padding: 0.6rem 0.9rem;
    background: linear-gradient(135deg, var(--bg-page), var(--bg-card-hover));
    border: 1px solid var(--border-card);
    border-radius: var(--radius-md);
    transition:
      box-shadow 0.2s ease,
      border-color 0.2s ease;
    cursor: pointer;
  }

  /* .wayline-card.mapping {
    border-left: 3px solid var(--border-accent);
  } */

  .wayline-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .wayline-icon {
    flex-shrink: 0;
    width: 1.3rem;
    height: 1.3rem;
    fill: var(--text-muted);
  }

  .wayline-info {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .wayline-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-heading);
  }

  .wayline-type-badge {
    font-size: 0.7rem;
    color: var(--text-faint);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .wayline-stats {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .stat {
    display: flex;
    align-items: baseline;
    gap: 0.15rem;
  }

  .stat-value {
    font-weight: 700;
    font-size: 1rem;
    color: var(--text-muted);
  }

  .stat-label {
    font-size: 0.7rem;
    color: var(--text-faint);
  }

  .stat-value.finish {
    font-size: 0.8rem;
    color: var(--text-subtle);
  }

  .stat-divider {
    width: 1px;
    height: 1rem;
    background: var(--border-light);
  }
</style>
