<script lang="ts">
  import type { User } from "$lib/types/user";

  const { user }: { user: User } = $props();

  function fmtDate(ts?: number): string {
    if (!ts) return "—";
    return new Date(ts).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  const roleLabel = $derived(user.role === "group-admin" ? "管理员" : "成员");
</script>

<div class="card" class:admin={user.role === "group-admin"}>
  <span class="avatar">{user.nick_name?.at(0) ?? "?"}</span>

  <div class="info">
    <span class="name">{user.nick_name ?? "未知"}</span>
    <span class="role">{roleLabel}</span>
  </div>

  <!-- <span class="sub-info">{fmtDate(user.create_time)}</span> -->
  <span class="sub-info">{user.account}</span>
</div>

<style>
  .card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: var(--space-sm);
    border-radius: var(--radius-pill);
    background: var(--bg-page);
    border: 1px solid var(--border-card);
    box-shadow: var(--elevation-1);
    transition: all 0.2s ease;
    list-style: none;
    width: 250px;
    min-width: 180px;
  }

  .card:hover {
    box-shadow: var(--elevation-2);
    transform: translateY(-1px);
    border-color: var(--border-hover);
  }

  .card.admin {
    border-color: var(--border-accent);
    border-width: 1.5px;
  }
  .card:not(.admin) {
    border-style: dashed;
  }

  .card.admin .avatar {
    background: var(--bg-inverse);
    color: var(--text-inverse);
  }

  .avatar {
    aspect-ratio: 1 / 1;
    width: 2.4rem;
    border-radius: 50%;
    background: var(--border-light);
    color: var(--text-muted);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1;
    user-select: none;
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.1rem;
  }

  .name {
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--text-heading);
  }

  .role {
    font-size: 0.75rem;
    color: var(--text-muted);
    background: var(--bg-subtle);
    padding: 0 0.4rem;
    border-radius: var(--radius-sm);
    width: fit-content;
  }

  .admin .role {
    background: var(--bg-card-hover);
    color: var(--text-heading);
    font-weight: 600;
  }

  .sub-info {
    font-size: 0.8rem;
    color: var(--text-faint);
    white-space: nowrap;
    margin-left: auto;
    margin-right: 2%;
  }
</style>
