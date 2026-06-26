<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import "../app.css";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Bitcount+Single:wght@100..900&display=swap"
    rel="stylesheet"
  />
  <script
    src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.2.6/dist/unicornStudio.umd.js"
  ></script>

  <!-- Maplibre GL library via CDN -->
  <link
    rel="stylesheet"
    href="https://unpkg.com/maplibre-gl@4/dist/maplibre-gl.css"
  />
  <script src="https://unpkg.com/maplibre-gl@4/dist/maplibre-gl.js"></script>
  <script src="https://unpkg.com/@turf/turf@7/turf.min.js"></script>
</svelte:head>

{@render children()}
