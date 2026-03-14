<script lang="ts">
import {PropertyStatus} from "$lib/enums";
import {PropertyType} from "$lib/enums";
  let { data } = $props();
  const propertyTypes = Object.values(PropertyType);
</script>

<form method="POST" enctype="multipart/form-data" class="mt-6 flex flex-col gap-3 max-w-xl">
<h1 class="text-xl font-semibold">Create property</h1>

  <label class="text-sm">
    Title
    <input class="mt-1 w-full rounded border p-2" name="title" required />
  </label>

  <label class="text-sm">
    Short description
    <input class="mt-1 w-full rounded border p-2" name="shortDescription" required />
  </label>

  <label class="text-sm">
    Description
    <textarea class="mt-1 w-full rounded border p-2" name="description" required></textarea>
  </label>

  <label class="text-sm">
    Location
    <input class="mt-1 w-full rounded border p-2" name="location" required />
  </label>

  <label class="text-sm">
    Max guests
    <input class="mt-1 w-full rounded border p-2" name="maxGuests" type="number" min="1" required />
  </label>

  <label class="text-sm">
    Price per night
    <input class="mt-1 w-full rounded border p-2" name="pricePerNight" type="number" step="0.01" min="0" required />
  </label>

  <label class="text-sm">
    Property type
    <select class="mt-1 w-full rounded border p-2" name="type" required>
      {#each propertyTypes as t}
        <option value={t}>{t}</option>
      {/each}
    </select>
  </label>
  <label class="text-sm">
    Cover image
    <input class="mt-1 block" type="file" name="displayImageFile" accept="image/*" required />
  </label>

  <label class="text-sm">
    Gallery images
    <input class="mt-1 block" type="file" name="imageFiles" accept="image/*" multiple />
  </label>

  <button class="mt-2 rounded-xl border px-4 py-2" formaction="?/create" type="submit">
    Create
  </button>
</form>
