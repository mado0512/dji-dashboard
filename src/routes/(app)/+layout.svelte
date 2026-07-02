<script lang="ts">
  let { children } = $props();
  import "../../app.css";

  import { afterNavigate, beforeNavigate } from "$app/navigation";

  import AppHeader from "$lib/components/AppHeader.svelte";
  import AppFooter from "$lib/components/AppFooter.svelte";

  let loading = $state(false);

  beforeNavigate(() => (loading = true));
  afterNavigate(() => (loading = false));
</script>

<div class="app-shell">
  <AppHeader />

  <main class="app-main">
    <div class="page-container">
      {@render children()}
    </div>
  </main>

  <AppFooter />
</div>

<style>
  .app-shell {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>
