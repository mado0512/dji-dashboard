<script lang="ts">
  import { page } from "$app/state";
</script>

<div class="error-page">
  <h1>{page.status}</h1>
  <p>{page.error?.message}</p>
  <a href="/">← 返回首页</a>
</div>

<style>
  .error-page {
    margin: 4rem;
    padding: var(--space-2xl);
    background: var(--bg-card);
    border: 1px solid var(--border-card);
    border-radius: var(--radius-md);
    text-align: center;

    h1 { font-size: 3rem; color: var(--text-muted); margin: 0; }
    p  { font-size: 1.2rem; color: var(--text-subtle); }
    a  { display: inline-block; margin-top: 1rem; color: var(--text-body); }
  }
</style>
