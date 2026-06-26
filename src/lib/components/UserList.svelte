<script lang="ts">
  import type { User } from "$lib/types/user";

  const { users }: { users: User[] } = $props();
</script>

<ul class="user-list">
  {#each users as user}
    <li class="user-profile" title={user.nick_name}>
      <span class="avatar">{user.nick_name?.at(0) ?? "?"}</span>
    </li>
  {/each}
</ul>

<style>
  :root {
    --overlap-distance: -10px;
    --spread-distance: 5px;
  }

  .user-list {
    display: flex;
    flex-flow: row nowrap;
    padding: 0;
    list-style: none;

    &:hover .user-profile:not(:first-child) {
      margin-left: var(--spread-distance);
    }
  }

  .user-profile {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s ease;

    &:not(:first-child) {
      margin-left: var(--overlap-distance);
    }

    &:hover {
      cursor: pointer;
    }
  }

  .avatar {
    aspect-ratio: 1 / 1;
    padding: var(--space-sm);
    border-radius: 50%;
    border: 2px solid var(--border-light);
    background: var(--bg-card-hover);
    color: var(--text-muted);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1;
    user-select: none;
    transition: all 0.2s ease;
  }

  .user-profile:hover .avatar {
    border-color: var(--border-accent);
    background: var(--border-card);
  }
</style>
