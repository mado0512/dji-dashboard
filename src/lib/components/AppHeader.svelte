<script lang="ts">
  import logo from "$lib/assets/Logo.svg";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  let groupIdInput = $state("");

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

<header class="center justify-between p-3 border-b border-neutral-300 mb-2">
  <img src={logo} alt="Logo" class="h-6 -skew-x-10" />

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
