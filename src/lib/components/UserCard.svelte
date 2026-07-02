<script lang="ts">
  import type { User } from "$lib/types/user";

  const { user }: { user: User } = $props();

  function fmtDate(ts?: number): string {
    if (!ts) return "—";
    return new Date(ts).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  const roleLabel = $derived(user.role === "group-admin" ? "管理员" : "成员");
</script>

<article
  class="group flex items-center rounded-full p-2 gap-2.5 transition-all hover:-translate-y-1 hover:shadow-sm border border-dashed border-neutral-300 admin:border-solid admin:border-neutral-500 w-60"
  class:admin={user.role === "group-admin"}
>
  <span class="avatar font-medium text-xl text-black"
    >{user.nick_name?.at(0) ?? "?"}</span
  >

  <hgroup class="center flex-col gap-0.5">
    <h4 class="font-light">{user.nick_name ?? "未知"}</h4>
    <span class="text-xs bg-neutral-200 px-1 py-0 rounded-sm">{roleLabel}</span>
  </hgroup>

  <span
    class="text-neutral-300 text-sm ml-auto mr-2 group-hover:text-neutral-400"
    >{user.account}</span
  >
</article>
