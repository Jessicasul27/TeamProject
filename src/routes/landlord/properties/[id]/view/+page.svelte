<script lang="ts">
  let { data } = $props();
  const property = data.property;
</script>

<div class="p-6 flex justify-center">
  <div class="card w-full max-w-4xl bg-base-100 shadow-sm">
    <figure class="h-72">
      <img
        src={property.displayImage}
        alt={property.title}
        class="h-full w-full object-cover" >
    </figure>

    <div class="card-body">
      <div class="flex items-start justify-between gap-4">
        <h1 class="card-title text-2xl">{property.title}</h1>
        <span class="badge badge-outline">{property.status}</span>
      </div>

      <p class="opacity-80">{property.description}</p>

      <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div class="rounded-lg bg-base-200 p-3">
          <div class="text-xs opacity-70">Location</div>
          <div class="font-medium">{property.location}</div>
        </div>

        <div class="rounded-lg bg-base-200 p-3">
          <div class="text-xs opacity-70">Type</div>
          <div class="font-medium">{property.type}</div>
        </div>

        <div class="rounded-lg bg-base-200 p-3">
          <div class="text-xs opacity-70">Max guests</div>
          <div class="font-medium">{property.maxGuests}</div>
        </div>

        <div class="rounded-lg bg-base-200 p-3">
          <div class="text-xs opacity-70">Price per night</div>
          <div class="font-medium">€{property.pricePerNight}</div>
        </div>
      </div>

      {#if property.images?.length}
        <div class="divider">Gallery</div>
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {#each property.images as img}
            <img
              src={img.imageUrl}
              alt=""
              class="h-28 w-full rounded-xl object-cover" >
          {/each}
        </div>
      {/if}

      <div class="card-actions justify-end mt-6 gap-2">
        <a href="/landlord/properties" class="btn btn-outline">Back</a>
      </div>
    </div>
  </div>
</div>
