<script lang="ts">
  import { PropertyStatus } from "$lib/enums";
  let { data } = $props();

  const editable = data.properties.filter(
    (p) => p.status === PropertyStatus.Inactive,
  );
  const locked = data.properties.filter(
    (p) => p.status !== PropertyStatus.Inactive,
  );
</script>

<div class="flex flex-col gap-10 px-6 py-6">
  <div>
    <h2 class="text-lg font-semibold">Editable (Inactive)</h2>

    <div class="mt-4 flex flex-wrap gap-4">
      {#each editable as property}
        <a
          href={`/landlord/properties/${property.id}`}
          class="flex flex-col gap-2">
          <img
            class="h-60 w-60 rounded-2xl object-cover"
            src={property.displayImage}
            alt={property.title} >
          <div class="flex flex-col">
            <span class="text-sm font-semibold text-neutral-950"
              >{property.title}</span
            >
            <span class="text-xs text-neutral-500">
              Max guests: {property.maxGuests} | {property.type}
            </span>
            <span class="text-xs text-neutral-500"
              >€{property.pricePerNight}
              per night</span
            >
            <span class="text-xs text-neutral-500"
              >Status: {property.status}</span
            >
          </div>
        </a>
      {/each}
    </div>
  </div>

  <div>
    <h2 class="text-lg font-semibold">Submitted / Locked</h2>

    <div class="mt-4 flex flex-wrap gap-4">
      {#each locked as property}
        <a
          href={`/landlord/properties/${property.id}`}
          class="flex flex-col gap-2 opacity-80">
          <img
            class="h-60 w-60 rounded-2xl object-cover"
            src={property.displayImage}
            alt={property.title} >
          <div class="flex flex-col">
            <span class="text-sm font-semibold text-neutral-950"
              >{property.title}</span
            >
            <span class="text-xs text-neutral-500">
              Max guests: {property.maxGuests} | {property.type}
            </span>
            <span class="text-xs text-neutral-500"
              >€{property.pricePerNight}
              per night</span
            >
            <span class="text-xs text-neutral-500"
              >Status: {property.status}</span
            >
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>
