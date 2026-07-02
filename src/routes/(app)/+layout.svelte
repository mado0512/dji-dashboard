<script lang="ts">
  import logo from "$lib/assets/Logo.svg";

  let { children } = $props();
  import "../../app.css"

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
    <span class="app-logo"><img src={logo} alt="Logo" class="logo-img" /></span>

    <form
      class="group-form"
      onsubmit={(e) => {
        e.preventDefault();
        applyGroupId();
      }}
    >
      <input
        id="group-id"
        class="group-input"
        type="text"
        placeholder="输入 group_id"
        bind:value={groupIdInput}
        onkeydown={onKeydown}
      />
      <button type="submit" class="group-btn">查询</button>
    </form>

    <nav class="app-nav">
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
    <span
      >Developed by Shifeng Hong <a href="https://shifengh-dev.bearblog.dev/"
        >mado0512</a
      > with Deepseek@reasonix</span
    >
    <span class="footer-muted">v0.0.2</span>
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

  .app-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--text-heading);
    letter-spacing: 0.03em;
    scale: var(--app-logo-size-lg);
    transform: scaleY(0.8) skewX(-10deg) translateX(20px);
    filter: blur(0.15px);
    margin-right: 20px;

    /* &:hover {
      opacity: 1;
      filter: drop-shadow(1px 1px 0.05px rgba(0, 0, 0, 0.25));
    } */
  }

  .logo-img {
    height: 1.4rem;
    width: auto;
  }

  .app-nav {
    display: flex;
    gap: 0.25rem;
  }

  .nav-link {
    padding: 0.35rem var(--space-md);
    border-radius: var(--radius-sm);
    font-size: 0.9rem;
    color: var(--text-muted);
    text-decoration: none;
    transition:
      background 0.15s ease,
      color 0.15s ease;
  }

  .nav-link:hover {
    background: var(--bg-subtle);
    color: var(--text-heading);
  }

  .group-form {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .group-input {
    width: 8rem;
    padding: 0.35rem var(--space-sm);
    border: 1px solid var(--border-card);
    border-radius: var(--radius-sm);
    background: var(--bg-page);
    color: var(--text-heading);
    font-size: 0.85rem;
    outline: none;
    transition: border-color 0.15s ease;
  }

  .group-input::placeholder {
    color: var(--text-faint);
  }
  .group-input:focus {
    border-color: var(--border-accent);
  }

  .group-btn {
    padding: 0.35rem var(--space-md);
    border: 1px solid var(--border-card);
    border-radius: var(--radius-sm);
    background: var(--bg-subtle);
    color: var(--text-muted);
    font-size: 0.8rem;
    cursor: pointer;
    transition:
      background 0.15s ease,
      border-color 0.15s ease;
  }

  .group-btn:hover {
    background: var(--bg-card-hover);
    border-color: var(--border-hover);
  }

  .app-main {
    flex: 1;
  }

  .app-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--space-xl);
    height: 2.5rem;
    font-size: 0.8rem;
    color: var(--text-muted);
    border-top: 1px solid var(--border-light);
    flex-shrink: 0;
  }

  .footer-muted {
    color: var(--text-faint);
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

  @media (max-width: 860px) {
    .app-logo {
      transform: scale(0.7) scaleY(0.8) skewX(-10deg) translateX(10px);
      margin-right: 8px;
      scale: var(--app-logo-size-md);
    }

    .app-header {
      padding: 0 var(--space-sm);
    }

    .group-input {
      width: 5rem;
    }
  }
</style>
