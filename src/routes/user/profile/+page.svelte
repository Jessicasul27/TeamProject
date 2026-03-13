<script lang="ts">
  let { data } = $props();
  let { user, bookings, properties } = data;
</script>

<div class="drawer lg:drawer-open">
  <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />

  <div class="drawer-content flex flex-col items-center justify-center">
    {#if user.customer}
      {#if !bookings || bookings.length === 0}
        <div class="flex flex-col items-center gap-4">
          <h1 class="text-2xl font-bold">No Bookings?</h1>
          <p class="text-center text-gray-600">
            It looks like you haven't made any bookings yet. Start exploring our
            properties and find your perfect stay!
          </p>

          <div class="flex flex-col gap-4 w-full max-w-md">
            <a href="/" class="btn btn-primary btn-block">
              Explore Properties!
            </a>
          </div>
        </div>
      {:else if bookings && bookings.length > 0}
        <div class="flex flex-col items-center gap-4">
          <h1 class="text-2xl font-bold">Welcome to your profile!</h1>
          <p class="text-center text-gray-600">
            Here you can manage your account details, view your bookings, and
            explore our properties.
          </p>
          {#each bookings as booking, index}
            <div class="carousel w-full">
              <div id="slide{index}" class="carousel-item relative w-full">
                <img
                  src={booking.property.displayImage}
                  class="w- justify-center"
                  alt="Property"
                />
                <div
                  class="absolute flex flex-col items-start left-5 top-1/2 transform -translate-y-1/2"
                >
                  <h2 class="text-2xl font-bold text-white">
                    {booking.property.title}
                  </h2>
                  <p class="text-white">
                    {booking.checkInDate.toLocaleDateString()} -{" "}
                    {booking.checkOutDate.toLocaleDateString()}
                  </p>
                </div>
                <div
                  class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"
                >
                  <a href="#slide{index - 1}" class="btn btn-circle">❮</a>
                  <a href="#slide{index + 1}" class="btn btn-circle">❯</a>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    {/if}

    {#if user.landlord}
      <div class="flex flex-col items-center gap-4">
        <h1 class="text-2xl font-bold">Welcome to your profile!</h1>
        <p class="text-center text-gray-600">
          Here you can manage your account details, view your properties, and
          explore our platform.
        </p>
      </div>

      <section class="mb-10">
        <h2 class="text-2xl font-bold text-primary mb-4">Your Properties</h2>
        <div class="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-6">
          {#if properties && properties.length > 0}
            {#each properties as property}
              <article
                class="card border border-base-300 bg-base-100 shadow-md transition-all duration-200 hover:scale-101 hover:shadow-xl"
              >
                <figure class="relative aspect-4/3 overflow-hidden bg-base-200">
                  <img
                    class="h-full w-full object-cover"
                    src={property.displayImage}
                    alt={property.title}
                  />

                  <div class="absolute top-3 right-3">
                    <div
                      class="badge badge-info badge-lg font-semibold text-white"
                    >
                      €{property.pricePerNight}
                    </div>
                  </div>
                </figure>

                <div class="card-body gap-4">
                  <h3 class="card-title line-clamp-2 text-base-content">
                    {property.title}
                    <span class="text-base-content/90"
                      >in {property.location}</span
                    >
                  </h3>

                  <p
                    class="line-clamp-3 text-sm leading-6 text-base-content/70"
                  >
                    {property.shortDescription}
                  </p>

                  <div class="card-actions mt-2">
                    <a
                      href={`/properties/${property.id}`}
                      class="btn btn-neutral btn-sm w-full"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </article>
            {/each}
          {:else}
            <div class="flex flex-col items-center gap-4">
              <h1 class="text-2xl font-bold">No Properties?</h1>
              <p class="text-center text-gray-600">
                It looks like you haven't listed any properties yet. Start
                sharing your space and earn by hosting travelers from around the
                world!
              </p>

              <div class="flex flex-col gap-4 w-full max-w-md">
                <a href="#" class="btn btn-primary btn-block">
                  List Your Property!
                </a>
              </div>
            </div>
          {/if}
        </div>
      </section>
    {/if}
  </div>

  <div class="drawer-side">
    <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"
    ></label>
    <ul class="menu bg-base-200 min-h-full w-100 p-4">
      <div class="avatar justify-center">
        <div class="w-80 rounded-full">
          <img
            src={"https://placehold.co/100x100?text=Avatar"}
            alt="User Avatar"
          />
        </div>
      </div>
      <div class="divider my-0"></div>
      <div class="flex flex-col items-center">
        <h1 class="text-xl font-bold mt-4 justify-center">
          Welcome, {data.user?.name}
        </h1>
      </div>
    </ul>
  </div>
</div>
