<script lang="ts">
  import { PropertyStatus, PropertyType } from "$lib/enums";
  let { data } = $props();

  const property = data.property;
  const propertyTypes = Object.values(PropertyType);

  const editable =
    property.status === PropertyStatus.Inactive ||
    property.status === PropertyStatus.Pending;
</script>

<div class="p-6 flex justify-center">
  <div class="card w-full max-w-3xl bg-base-100 shadow-sm">
    <div class="card-body">
      <div class="flex items-start justify-between gap-4">
        <h1 class="card-title text-2xl">{property.title}</h1>
        <span class="badge badge-outline">{property.status}</span>
      </div>

      {#if editable}
        <form
          method="POST"
          enctype="multipart/form-data"
          class="mt-4 flex flex-col gap-4">
          <label class="form-control w-full">
            <div class="label"><span class="label-text">Title</span></div>
            <input
              name="title"
              class="input input-bordered w-full"
              value={property.title}>
          </label>

          <label class="form-control w-full">
            <div class="label"><span class="label-text">Description</span></div>
            <textarea
              name="description"
              class="textarea textarea-bordered w-full">
              {property.description}
            </textarea>
          </label>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Max guests</span>
              </div>
              <input
                name="maxGuests"
                type="number"
                min="1"
                class="input input-bordered w-full"
                value={property.maxGuests}>
            </label>

            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Price per night</span>
              </div>
              <input
                name="pricePerNight"
                type="number"
                step="0.01"
                min="0"
                class="input input-bordered w-full"
                value={property.pricePerNight}>
            </label>
          </div>

          <label class="form-control w-full">
            <div class="label"><span class="label-text">Location</span></div>
            <input
              name="location"
              class="input input-bordered w-full"
              value={property.location}>
          </label>

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Property type</span>
            </div>
            <select name="type" class="select select-bordered w-full">
              {#each propertyTypes as t}
                <option value={t} selected={t === property.type}>{t}</option>
              {/each}
            </select>
          </label>

          <div class="divider">Images</div>

          <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
            <div class="flex flex-col gap-2">
              <span class="text-sm font-medium">Current cover</span>
              <img
                src={property.displayImage}
                alt="Cover"
                class="h-32 w-32 rounded-xl object-cover border">
            </div>

            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Upload new cover image</span>
              </div>
              <input
                type="file"
                name="displayImageFile"
                accept="image/*"
                class="file-input file-input-bordered w-full">
            </label>
          </div>

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Add gallery images</span>
            </div>
            <input
              type="file"
              name="imageFiles"
              accept="image/*"
              multiple
              class="file-input file-input-bordered w-full">
          </label>

          {#if property.images?.length}
            <div class="mt-2">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium">Existing gallery images</p>
                <span class="text-xs opacity-70">Tick to remove</span>
              </div>

              <div
                class="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {#each property.images as img}
                  <label
                    class="card bg-base-200 p-2 cursor-pointer hover:bg-base-300 transition">
                    <img
                      src={img.imageUrl}
                      alt=""
                      class="h-24 w-full rounded-lg object-cover">
                    <div class="mt-2 flex items-center justify-between">
                      <span class="text-xs">Remove</span>
                      <input
                        type="checkbox"
                        class="checkbox checkbox-sm"
                        name="removeImageIds"
                        value={img.id}>
                    </div>
                  </label>
                {/each}
              </div>
            </div>
          {/if}

          <div class="card-actions justify-end mt-2 gap-2">
            <button class="btn btn-success" formaction="?/update" type="submit">
              Save
            </button>
            <button class="btn btn-primary" formaction="?/submit" type="submit">
              Submit
            </button>
            <button
              class="btn btn-error btn-outline"
              formaction="?/delete"
              type="submit">
              Delete
            </button>
          </div>
        </form>
      {:else}
        <div class="alert alert-info mt-4">
          <span
            >This property is already submitted/active and can't be edited.</span
          >
        </div>
      {/if}
    </div>
  </div>
</div>
