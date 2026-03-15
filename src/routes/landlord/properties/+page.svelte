<script lang="ts">
  import { PropertyStatus } from "$lib/enums";
  let { data } = $props();

  const editable = data.properties.filter(
    (p) =>
      p.status === PropertyStatus.Inactive ||
      p.status === PropertyStatus.Pending,
  );

  const locked = data.properties.filter(
    (p) => p.status === PropertyStatus.Active,
  );
</script>

<div class="p-6">
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-bold">Your Properties</h1>

    <a href="/landlord/properties/create" class="btn btn-primary">
      Create Property
    </a>
  </div>

  <section class="mt-10">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold">Editable</h2>
      <span class="badge badge-outline">{editable.length}</span>
    </div>

    {#if editable.length === 0}
      <p class="mt-3 text-sm opacity-70">No editable properties right now.</p>
    {:else}
      <div class="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {#each editable as property}
          <a
            href={`/landlord/properties/${property.id}/edit`}
            class="card bg-base-100 shadow-sm hover:shadow-md transition">
            <figure class="h-70">
              <img
                class="h-full w-full object-cover"
                src={property.displayImage}
                alt={property.title} >
            </figure>

            <div class="card-body">
              <h3 class="card-title">
                {property.title}
                <span class="badge badge-warning">{property.status}</span>
              </h3>

              <p class="text-sm opacity-80">
                Max guests: {property.maxGuests} | {property.type}
              </p>

              <p class="text-sm font-semibold">
                €{property.pricePerNight}
                <span class="font-normal opacity-70">/ night</span>
              </p>

              <div class="card-actions justify-end">
                <span class="btn btn-sm btn-outline">Manage</span>
              </div>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </section>

  <section class="mt-12">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold">Approved</h2>
      <span class="badge badge-outline">{locked.length}</span>
    </div>

    {#if locked.length === 0}
      <p class="mt-3 text-sm opacity-70">No Submitted properties</p>
    {:else}
      <div class="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {#each locked as property}
          <div
            class="card bg-base-100 shadow-sm opacity-80 hover:opacity-100 hover:shadow-md transition">
            <figure class="h-70">
              <img
                class="h-full w-full object-cover"
                src={property.displayImage}
                alt={property.title} >
            </figure>

            <div class="card-body">
              <h3 class="card-title">
                {property.title}
                <span class="badge badge-success">{property.status}</span>
              </h3>

              <p class="text-sm opacity-80">
                Max guests: {property.maxGuests} | {property.type}
              </p>

              <p class="text-sm font-semibold">
                €{property.pricePerNight}
                <span class="font-normal opacity-70">/ night</span>
              </p>

              <div class="card-actions justify-end gap-2">
                <a
                  href={`/landlord/properties/${property.id}/view`}
                  class="btn btn-sm btn-outline">
                  View
                </a>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </section>
</div>
