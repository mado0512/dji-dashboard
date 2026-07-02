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
  class="scene-bg fixed inset-0"
></div>

<div class="relative z-1 h-screen center">
  <header class="app-landing-header card">
    <span class="m-5 center"
      ><img class="h-12 md:h-8" src={logo} alt="Logo" /></span
    >

    <form
      class="flex flex-col w-full h-full justify-end md:flex-row gap-3"
      onsubmit={(e) => {
        e.preventDefault();
        applyGroupId();
      }}
    >
      <input
        id="group-id"
        class="group-input-landing"
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
