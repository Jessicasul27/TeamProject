<script lang="ts">
  import { resolve } from "$app/paths";
  import { onMount } from "svelte";

  const { data, form } = $props();
  const property = data.property;

  function getLocalToday() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const today = getLocalToday();
  const bookingError = form?.bookingError ?? null;

  onMount(() => {
    if (bookingError) {
      alert(bookingError);
    }
  });
</script>

<div class="backgroundWhite container">
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-md-6">
          <h1 class="text-primary">{property.title}</h1>
        </div>

        <div class="col-md-6 text-end">
          <h1 class="text-muted">€{property.pricePerNight}</h1>
        </div>
      </div>
    </div>

    <div class="card-body">
      <div class="row">
        <div class="col-lg-8">
          <p>{property.description}</p>
          <p>{property.type}</p>

          <p><strong>Max Guests:</strong> {property.maxGuests}</p>
          <p><strong>Location:</strong> {property.location}</p>
          <p><strong>Price:</strong> €{property.pricePerNight} per night</p>
        </div>

        <div class="col-lg-4 text-center">
          <img src={property.displayImage} class="img-fluid rounded" alt="" >
        </div>

        <div class="col-12 mt-4">
          <h4>Gallery</h4>

          {#if property.images?.length}
            <div class="row">
              {#each property.images as image}
                <div class="col-md-3 col-4 mb-3">
                  <img
                    src={image.imageUrl}
                    class="img-fluid rounded"
                    style="height:150px; object-fit:cover; width:100%;"
                    alt="" >
                </div>
              {/each}
            </div>
          {:else}
            <p>No additional images available</p>
          {/if}
        </div>
      </div>

      <hr >

      <form method="post" action="?/prepare">
        <div class="row mt-3">
          <div class="col-md-6">
            <label>Check In</label>
            <input
              name="checkIn"
              type="date"
              class="form-control"
              min={today}
              required >
          </div>

          <div class="col-md-6">
            <label>Check Out</label>
            <input
              name="checkOut"
              type="date"
              class="form-control"
              min={today}
              required >
          </div>
        </div>

        <div class="card-footer mt-4">
          <div class="row">
            <div class="col-md-6">
              <a href={resolve("/")} class="btn btn-success w-100">
                Back to List
              </a>
            </div>

            <div class="col-md-6">
              <button type="submit" class="btn btn-primary w-100">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
