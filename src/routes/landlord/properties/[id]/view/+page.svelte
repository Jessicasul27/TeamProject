<script lang="ts">
  let { data } = $props();
  const property = data.property;
</script>

<div class="p-6">
  <div class="flex items-center justify-end mb-4">
    <a href="/landlord/properties" class="btn btn-outline btn-sm">Back</a>
  </div>

  <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
    <div class="card bg-base-100 shadow-sm">
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
      </div>
    </div>

    <div class="card bg-base-100 shadow-sm">
      <div class="card-body">
        <div class="flex items-center justify-between">
          <h2 class="card-title text-xl">Bookings</h2>
          <span class="badge badge-outline"
            >{property.bookings?.length ?? 0}</span
          >
        </div>

        {#if property.bookings?.length}
          <div class="mt-3 flex flex-col gap-3">
            {#each property.bookings as b}
              <div class="card bg-base-100 shadow-sm border">
                <div class="card-body p-4">
                  <div class="flex items-start gap-3">
                    <div class="avatar">
                      <div class="w-10 rounded-full">
                        <img
                          src={b.customer?.user?.image}
                          alt={b.customer?.user?.name ?? "Customer"} >
                      </div>
                    </div>
                    <div>
                      <h3 class="font-semibold">
                        {b.customer?.user?.name ?? "Unknown Name"}
                      </h3>
                      <p class="text-sm opacity-70">
                        {b.customer?.user?.email ?? "-"}
                        | {b.customer?.user?.phoneNumber ?? "-"}
                      </p>
                    </div>

                    <div class="text-right">
                      <div class="badge badge-outline">€{b.bookingPrice}</div>
                      <p class="text-xs opacity-70 mt-1">
                        Booked {new Date(b.bookedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div class="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div class="rounded-lg bg-base-200 p-3">
                      <div class="text-xs opacity-70">Check-in</div>
                      <div class="font-medium">
                        {new Date(b.checkInDate).toLocaleDateString()}
                      </div>
                    </div>

                    <div class="rounded-lg bg-base-200 p-3">
                      <div class="text-xs opacity-70">Check-out</div>
                      <div class="font-medium">
                        {new Date(b.checkOutDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div class="card-actions justify-end mt-3">
                    <span class="text-xs opacity-70">Booking ID: {b.id}</span>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {:else}
          <p class="mt-3 opacity-70">No bookings yet.</p>
        {/if}
      </div>
    </div>
  </div>
</div>
