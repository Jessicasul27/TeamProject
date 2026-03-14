<script lang="ts">
  import { PropertyStatus } from "$lib/enums";
  import { PropertyType } from "$lib/enums";
  let { data } = $props();

  const property = data.property;
  const propertyTypes = Object.values(PropertyType);
  const editable = property.status === PropertyStatus.Inactive;
</script>

{#if editable}
  <form
    method="POST"
    enctype="multipart/form-data"
    class="mt-6 flex flex-col gap-3 max-w-xl">
    <label class="text-sm">
      Title
      <input
        class="mt-1 w-full rounded border p-2"
        name="title"
        value={property.title} >
    </label>
    <label class="text-sm">
      Description
      <textarea class="mt-1 w-full rounded border p-2" name="description">
        {property.description}
      </textarea>
    </label>
    <label class="text-sm">
      Max Guests
      <input
        class="mt-1 w-full rounded border p-2"
        name="maxGuests"
        value={property.maxGuests} >
    </label>
    <label>
      Price Per Night
      <input
        class="mt-1 w-full rounded border p-2"
        name="pricePerNight"
        value={property.pricePerNight} >
    </label>
    <label>
      Location
      <input
        class="mt-1 w-full rounded border p-2"
        name="location"
        value={property.location} >
    </label>
    <label>
      Status
      <input
        class="mt-1 w-full rounded border p-2"
        name="status"
        value={property.status}
        readonly >
    </label>
    <label>
      Property Type
      <select
        class="mt-1 w-full rounded border p-2"
        name="type"
        value={property.type}>
        {#each propertyTypes as t}
          <option value={t}>{t}</option>
        {/each}
      </select>
    </label>

    <div class="mt-2 flex gap-3">
      <button
        type="submit"
        class="rounded-xl border px-4 py-2"
        formaction="?/update">
        Save
      </button>
      <button
        type="submit"
        class="rounded-xl border px-4 py-2"
        formaction="?/submit">
        Submit
      </button>
      <button
        type="submit"
        class="rounded-xl border px-4 py-2"
        formaction="?/delete">
        Delete
      </button>
    </div>
  </form>
{:else}
  <p class="mt-6 rounded-xl border p-3 text-sm text-neutral-600">
    This property is already
    <b>Submitted</b>.
  </p>
{/if}
