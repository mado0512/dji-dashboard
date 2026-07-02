<script lang="ts">
  import logo from "$lib/assets/Logo.svg";

  let { children } = $props();
  import "../../app.css";

  import { afterNavigate, beforeNavigate, goto } from "$app/navigation";
  import { page } from "$app/state";

  let groupIdInput = $state("");
  let loading = $state(false);

  beforeNavigate(() => (loading = true));
  afterNavigate(() => (loading = false));

  $effect(() => {
    groupIdInput = page.params.group_id ?? "";
  });

  function applyGroupId() {
    const val = groupIdInput.trim();
    if (!val) return;
    const sub = page.url.pathname.split("/").slice(3).join("/") || "";
    goto(`/group/${val}${sub ? "/" + sub : ""}`);
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === "Enter") applyGroupId();
  }
</script>

<div class="app-shell">
  <header class="app-header">
    <span class="app-logo"
      ><img src={logo} alt="Logo" class="logo-img h-6" /></span
    >

    <form
      class="center gap-2"
      onsubmit={(e) => {
        e.preventDefault();
        applyGroupId();
      }}
    >
      <input
        id="group-id"
        class="group-input-normal"
        type="text"
        placeholder="输入 group_id"
        bind:value={groupIdInput}
        onkeydown={onKeydown}
      />
      <button type="submit">查询</button>
    </form>

    <nav class="flex gap-1">
      <a href="/" class="nav-link">首页</a>
      <a href="/group/{page.params.group_id ?? ''}" class="nav-link">仪表盘</a>
      <a href="/group/{page.params.group_id ?? ''}/dashboard" class="nav-link"
        >设备仓库</a
      >
    </nav>
  </header>

  <main class="app-main">
    <div class="page-container">
      {@render children()}
    </div>
  </main>

  <footer class="app-footer">
    <span class="hidden md:block text-neutral-400"
      >Developed by Shifeng Hong <a href="https://shifengh-dev.bearblog.dev/"
        >mado0512</a
      > with Deepseek@reasonix</span
    >
    <span class="version-number ml-auto text-neutral-400">v0.0.2</span>
  </footer>
</div>

<!-- {#if loading}
  <div class="loading-overlay"></div>
{/if} -->

<style>
  .app-shell {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .app-header {
    position: relative;
    z-index: 11;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--space-xl);
    height: 3.5rem;
    background: var(--bg-card);
    border-bottom: 1px solid var(--border-light);
    flex-shrink: 0;
    overflow: hidden;
  }

  .app-main {
    flex: 1;
  }

  /* ── Loading overlay ──────────────────────────── */

  /* .loading-overlay {
    position: fixed;
    inset: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.45);
    animation: breathe 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  } */

  @keyframes breathe {
    0%,
    100% {
      opacity: 0.3;
      backdrop-filter: blur(2px);
    }
    50% {
      opacity: 1;
      backdrop-filter: blur(6px);
    }
  }
</style>
