<script lang="ts">
  let { data } = $props();
</script>

<div class="p-6">
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-bold">Pending Properties</h1>
    <span class="badge badge-outline">{data.properties.length}</span>
  </div>

  <section class="mt-10">
    {#if data.properties.length === 0}
      <p class="mt-3 text-sm opacity-70">No properties waiting for review.</p>
    {:else}
      <div class="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {#each data.properties as property}
          <div class="card bg-base-100 shadow-sm hover:shadow-md transition">
            <figure class="h-70">
              <img
                class="h-full w-full object-cover"
                src={property.displayImage}
                alt={property.title}>
            </figure>

            <div class="card-body">
              <h3 class="card-title">
                {property.title}
                <span class="badge badge-warning">{property.status}</span>
              </h3>

              <p class="text-sm opacity-80">{property.location}</p>

              <p class="text-sm opacity-80">
                Max guests: {property.maxGuests} | {property.type}
              </p>

              <p class="text-sm font-semibold">
                €{property.pricePerNight}
                <span class="font-normal opacity-70">/ night</span>
              </p>

              <div class="card-actions justify-end">
                <a
                  href={`/admin/properties/${property.id}`}
                  class="btn btn-sm btn-primary">
                  Review
                </a>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </section>
</div>
