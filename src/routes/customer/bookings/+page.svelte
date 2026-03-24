<script lang="ts">
  let { data } = $props();
  let { bookings } = data;

  function datediff(first: Date, second: Date) {
    return Math.round(
      (second.getTime() - first.getTime()) / (1000 * 3600 * 24),
    );
  }
</script>

<div class="flex flex-col gap-4 mt-10">
  {#if bookings && bookings.length > 0}
    <h1 class="text-2xl font-semibold text-center ">Your Bookings</h1>
    <p class="text-center text-gray-600 mb-10">
      View all previous and upcoming bookings you've made. Click on any booking
      to see more details about your stay!
    </p>

    <div class="divider my-0"></div>

    <div class="flex flex-wrap gap-6 justify-center">
      {#each bookings as booking}
        <div class="w-96">
          <div class="card bg-base-100 h-150 shadow-sm">
            <figure>
              <img
                src={booking.property.displayImage}
                class="w-100 h-100 object-cover"
                alt={booking.property.title}>
            </figure>

            <div class="card-body">
              <h2 class="card-title">{booking.property.title}</h2>
              <p>{booking.property?.description}</p>
              <p class="font-semibold text-gray-600">
                Check-in: {booking.checkInDate.toLocaleDateString()} <br>
                Check-out: {booking.checkOutDate.toLocaleDateString()} <br>
                <br>
                Total Price: ${(booking.bookingPrice * datediff(booking.checkInDate, booking.checkOutDate)).toFixed(2)}
              </p>
              <div class="divider my-0"></div>
              <div class="card-actions justify-center">
                <a
                  class="btn btn-primary"
                  href={`/properties/${booking.property.id}`}
                  >View Property</a
                >
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="flex flex-col items-center gap-4">
      <h1 class="text-2xl font-semibold text-center">No Bookings?</h1>
      <p class="text-center text-gray-600">
        It looks like you haven't made any bookings yet. Start exploring our
        properties and find your perfect stay!
      </p>

      <div class="flex flex-col gap-4 w-full max-w-md mx-auto">
        <a href="/" class="btn btn-primary btn-block"> Explore Properties! </a>
      </div>
    </div>
  {/if}
</div>
