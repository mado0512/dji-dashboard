<script lang="ts">
  let { entity = "Unknown", items = [], fn = (x: any) => x?.name ?? "" }: {
    entity?: string;
    items: any[];
    fn?: (item: any) => string;
  } = $props();
</script>

<ul>
  <h2>{entity} list</h2>
  {#each items as item}
    <li>{fn(item)}</li>
  {/each}
</ul>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ul {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
    padding: var(--space-lg);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-md);
    background: var(--bg-page);
    list-style: disc;

    & li {
      margin-left: 20px;
      color: var(--text-body);
      background-color: var(--bg-subtle);
      padding: 0.25rem var(--space-sm);
      border-radius: var(--radius-sm);
      transition: background 0.15s ease;

      &:hover {
        background-color: var(--bg-card-hover);
        cursor: pointer;
      }
    }
  }
</style>
