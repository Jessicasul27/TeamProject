<script lang="ts">
  import { PropertyType } from "$lib/enums";
  const propertyTypes = Object.values(PropertyType);
</script>

<div class="p-6 flex justify-center">
  <div class="card w-full max-w-xl bg-base-100 shadow-sm">
    <div class="card-body">
      <h1 class="card-title text-2xl">Create property</h1>

      <form
        method="POST"
        enctype="multipart/form-data"
        class="mt-4 flex flex-col gap-4">
        <label class="form-control w-full">
          <div class="label"><span class="label-text">Title</span></div>
          <input name="title" required class="input input-bordered w-full" >
        </label>

        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Short description</span>
          </div>
          <input
            name="shortDescription"
            required
            class="input input-bordered w-full" >
        </label>

        <label class="form-control w-full">
          <div class="label"><span class="label-text">Description</span></div>
          <textarea
            name="description"
            required
            class="textarea textarea-bordered w-full"></textarea>
        </label>

        <label class="form-control w-full">
          <div class="label"><span class="label-text">Location</span></div>
          <input name="location" required class="input input-bordered w-full" >
        </label>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label class="form-control w-full">
            <div class="label"><span class="label-text">Max guests</span></div>
            <input
              name="maxGuests"
              type="number"
              min="1"
              required
              class="input input-bordered w-full" >
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
              required
              class="input input-bordered w-full" >
          </label>
        </div>

        <label class="form-control w-full">
          <div class="label"><span class="label-text">Property type</span></div>
          <select name="type" required class="select select-bordered w-full">
            {#each propertyTypes as t}
              <option value={t}>{t}</option>
            {/each}
          </select>
        </label>

        <label class="form-control w-full">
          <div class="label"><span class="label-text">Cover image</span></div>
          <input
            type="file"
            name="displayImageFile"
            accept="image/*"
            required
            class="file-input file-input-bordered w-full" >
        </label>

        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Gallery images</span>
          </div>
          <input
            type="file"
            name="imageFiles"
            accept="image/*"
            multiple
            class="file-input file-input-bordered w-full" >
        </label>

        <div class="card-actions justify-end mt-2">
          <button class="btn btn-primary" formaction="?/create" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
