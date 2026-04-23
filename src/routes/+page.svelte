<script lang="ts">
  import { resolve } from "$app/paths";
  import { onMount } from "svelte";

  let { data } = $props();

  onMount(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("paid") === "true") {
      alert("Payment successful! Your booking is confirmed.");
    }
  });
</script>

<svelte:head><title>Staycraft</title></svelte:head>

<div class="container mx-auto py-6">
  {#if data.properties.length === 0}
    <div
      class="rounded-2xl border border-base-300 bg-base-100 p-8 text-center shadow-md">
      <h2 class="text-2xl font-bold">No properties found</h2>
      <p class="mt-2 text-base-content/70">
        Try changing the county, dates, or guest count.
      </p>
    </div>
  {:else}
    <div class="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-6">
      {#each data.properties as property}
        <article
          class="card border border-base-300 bg-base-100 shadow-md transition-all duration-200 hover:scale-101 hover:shadow-xl">
          <figure class="relative aspect-4/3 overflow-hidden bg-base-200">
            <img
              class="h-full w-full object-cover"
              src={property.displayImage}
              alt={property.title}>

            <div class="absolute top-3 right-3">
              <div class="badge badge-info badge-lg font-semibold text-white">
                €{property.pricePerNight}
              </div>
            </div>
          </figure>

          <div class="card-body gap-4">
            <h3 class="card-title line-clamp-2 text-base-content">
              {property.title}
              <span class="text-base-content/90">in {property.location}</span>
            </h3>

            <p class="line-clamp-3 text-sm leading-6 text-base-content/70">
              {property.shortDescription}
            </p>

            <div class="card-actions mt-2">
              <a
                href={resolve(`/properties/${property.id}`)}
                class="btn btn-neutral btn-sm w-full">
                View Details
              </a>
            </div>
          </div>
        </article>
      {/each}
    </div>
  {/if}
</div>
