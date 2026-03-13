<script lang="ts">
  import { Star } from "lucide-svelte";

  let { data } = $props();
</script>

<div>Your properties:</div>

<div class="mx-40 flex flex-wrap items-center gap-4">
  {#each data.properties as property}
    <div class="flex flex-col gap-2">
      <img
        class="h-60 w-60 rounded-2xl object-cover"
        src={property.displayImage}
        alt="" >
      <div class="flex flex-col">
        <span class="text-sm font-semibold text-neutral-950"
          >{property.title}</span
        >
        <span class="text-xs text-neutral-500"
          >Max guests: {property.maxGuests} | {property.type}</span
        >
        <span class="text-xs text-neutral-500">
          €{property.pricePerNight}
          per night
        </span>
        <span class="flex gap-1">
          {#each Array.from({ length: 3 + ~~(Math.random() * 3) }) as _}
            <Star fill="#000" class="h-3 w-3" />
          {/each}
        </span>
      </div>
    </div>
  {/each}
</div>
