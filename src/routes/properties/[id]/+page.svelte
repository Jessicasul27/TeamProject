<script lang="ts">
  import { resolve } from "$app/paths";

  // `data` is the object returned from the `load` function in `+page.server.ts`
  const { data } = $props();

  // our property was loaded during server-side rendering, which we now access here
  const property = data.property;
</script>

<div class="backgroundWhite container">
  <div class="card">
    <div class="card-header">
      <div class="text-light row ml-0">
        <div class="col-md-6 col-12 pt-2">
          <h1 class="text-primary">{property.title}</h1>
        </div>

        <div class="col-md-6 col-12 pt-2 text-end">
          <h1 class="text-muted">€{property.pricePerNight}</h1>
        </div>
      </div>
    </div>

    <div class="card-body">
      <div class="container rounded p-2">
        <div class="row">
          <div class="col-lg-8 col-12">
            <p class="text-secondary">{property.description}</p>
            <p class="text-secondary">{property.type}</p>

            <p>Max Guests: {property.maxGuests}</p>
            <p>Location: {property.location}</p>
            <p>€{property.pricePerNight} per night</p>
          </div>

          <div class="col-lg-4 col-12 p-1 text-center">
            <img
              src={property.displayImage}
              width="100%"
              class="rounded"
              alt="" >
          </div>

          <div class="col-12 mt-3">
            <h4>Gallery</h4>

            {#if property.images}
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

        <form method="post">
          <input type="hidden" name="id" value="@Model.Property.Id" >

          <div class="row mt-3">
            <div class="col-md-6">
              <label for="check-in">Check In</label>
              <input
                id="check-in"
                type="date"
                class="form-control"
                min={Date.now()} >
            </div>

            <div class="col-md-6">
              <label for="check-out">Check Out</label>
              <input
                id="check-out"
                type="date"
                class="form-control"
                min={Date.now()} >
            </div>
          </div>

          <div class="text-danger mt-2">@Model.ErrorMessage</div>

          <div class="card-footer mt-3">
            <div class="row">
              <div class="col-md-6 col-12 pb-1">
                <a
                  href={resolve("/")}
                  class="btn btn-success form-control"
                  style="height:50px;">
                  Back to List
                </a>
              </div>

              <div class="col-md-6 col-12">
                <button
                  type="submit"
                  class="btn btn-primary form-control"
                  style="height:50px;">
                  Book now!
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
