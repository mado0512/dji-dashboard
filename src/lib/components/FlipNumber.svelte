<script lang="ts">
  let { value = 0 } = $props();

  let digits = $derived(String(value).split(""));
</script>

<div class="flip-counter">
  {#each digits as digit, i (i)}
    {#key digit}
      <span class="digit" style="animation-delay: {i * 0.04}s">{digit}</span>
    {/key}
  {/each}
</div>

<style>
  .flip-counter {
    display: inline-flex;
    font-variant-numeric: tabular-nums;
    gap: 0.02em;
  }

  .digit {
    display: inline-block;
    animation: flip-in 0.35s ease-out both;
    transform-origin: bottom center;
  }

  @keyframes flip-in {
    from {
      transform: rotateX(-90deg);
      opacity: 0.2;
    }
    to {
      transform: rotateX(0);
      opacity: 1;
    }
  }
</style>
