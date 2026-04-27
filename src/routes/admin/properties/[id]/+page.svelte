<script lang="ts">
  let { data } = $props();
</script>

<div class="p-6 max-w-2xl mx-auto">
  {#if data.property.displayImage}
    <img
      src={data.property.displayImage}
      alt={data.property.title}
      class="w-full h-64 object-cover rounded-lg mb-4">
  {/if}

  <h1 class="text-2xl font-bold mb-2">{data.property.title}</h1>

  <p class="text-sm text-gray-500 mb-2">{data.property.location}</p>
  <p class="text-sm text-gray-500 mb-2">
    Submitted by: {data.property.landlord.user.name}
  </p>

  <p class="mb-4">{data.property.description}</p>

  <p class="mb-2"><strong>Guests:</strong> {data.property.maxGuests}</p>

  <p class="mb-4">
    <strong>Price:</strong>
    €{data.property.pricePerNight}
    / night
  </p>

  <div class="flex gap-2 mt-4">
    <form method="POST" action="?/approve">
      <button class="btn btn-success btn-sm">Approve</button>
    </form>

    <form method="POST" action="?/deny">
      <button class="btn btn-error btn-sm">Deny</button>
    </form>
  </div>

  <div class="mt-6">
    <a href="/admin/properties" class="btn btn-outline btn-sm"> Back </a>
  </div>
</div>
