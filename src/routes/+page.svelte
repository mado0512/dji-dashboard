<script lang="ts">
  import { afterNavigate, beforeNavigate, goto } from "$app/navigation";
  import { page } from "$app/state";
  import { PUBLIC_UNICORN_PROJECT_ID } from "$env/static/public";
  import logo from "$lib/assets/Logo.svg";

  let groupIdInput = $state("");
  let loading = $state(false);

  beforeNavigate(() => (loading = true));
  afterNavigate(() => (loading = false));

  $effect(() => {
    groupIdInput = page.params.group_id ?? "";
  });

  // ── Unicorn Studio WebGL background ────────────────

  $effect(() => {
    let scene: any;

    (window as any).UnicornStudio?.addScene({
      elementId: "unicorn-container",
      projectId: PUBLIC_UNICORN_PROJECT_ID,
      scale: 1,
      dpi: 2,
      fps: 24,
      production: false,
      initialVariables: {
        accentColor: "#d4d4d4",
        intensity: 0.6,
      },
    }).then((s: any) => {
      scene = s;
    });

    return () => {
      scene?.destroy();
    };
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

<div
  id="unicorn-container"
  class="scene-bg fixed inset-0 w-screen h-screen"
></div>

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
        class="group-input text-center"
        type="text"
        placeholder="输入 group_id"
        bind:value={groupIdInput}
        onkeydown={onKeydown}
      />
      <button type="submit" class="group-btn">查询</button>
    </form>
  </header>
</div>

{#if loading}
  <div class="loading-overlay"></div>
{/if}

<style>
  /* ── Full-viewport WebGL background ───────────── */

  /* .scene-bg {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
  } */

  /* ── UI layer on top ──────────────────────────── */

  /* .group-form {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  } */

  /* .group-input {
    width: 8rem;
    padding: 0.35rem var(--space-sm);
    border: 1px solid var(--border-card);
    border-radius: var(--radius-sm);
    background: var(--bg-page);
    color: var(--text-heading);
    font-size: 0.85rem;
    outline: none;
    transition: border-color 0.15s ease;
  } */

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

  /* ── Loading overlay ──────────────────────────── */

  .loading-overlay {
    position: fixed;
    inset: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.45);
    animation: breathe 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

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
