<script lang="ts">
  import { Minus, Plus } from "lucide-svelte";

  const categories = $state([
    {
      count: 0,
      label: "Adults",
      description: "Ages 13 or above",
    },
    {
      count: 0,
      label: "Children",
      description: "Ages 2-12",
    },
    {
      count: 0,
      label: "Infants",
      description: "Under 2",
    },
  ]);
</script>

<div
  class="absolute left-0 top-[120%] border border-base-300 rounded-xl p-8 bg-base-100 z-2">
  {#each categories as { count, label, description }, i}
    {#if i !== 0}
      <div class="divider"></div>
    {/if}
    <div class="flex">
      <div class="flex flex-col gap-2 w-40">
        <span class="font-semibold text-lg">{label}</span>
        <span class="text-base-content/70">{description}</span>
      </div>
      <div class="flex items-center gap-2">
        <button onclick={() => categories[i].count -= 1} disabled={count === 0}>
          <Minus />
        </button>
        <span class="text-lg font-semibold">{count}</span>
        <button onclick={() => categories[i].count += 1} class="cursor-pointer">
          <Plus />
        </button>
      </div>
    </div>
  {/each}
</div>
