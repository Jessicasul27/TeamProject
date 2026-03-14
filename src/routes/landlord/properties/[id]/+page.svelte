<script lang="ts">
  import { PropertyStatus } from "$lib/enums";
  let { data } = $props();

  const property = data.property;
  const editable = property.status === PropertyStatus.Inactive;
</script>

<h1 class="text-xl font-semibold">{property.title}</h1>
<p class="text-sm text-neutral-600">Status: {property.status}</p>
<div class="flex flex-col gap-2">
  <p>Property Name: {data.property.title}</p>
  <p>Property ID: {data.property.id}</p>
  <p>Status: {data.property.status}</p>
  <p>Max Guests: {data.property.maxGuests}</p>
  <p>Description: {data.property.description}</p>
  <p>Bookings: {data.property.bookings}</p>
</div>
