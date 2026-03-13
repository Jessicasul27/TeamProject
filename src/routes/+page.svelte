<script lang="ts">
  import { resolve } from "$app/paths";
  import { Search } from "lucide-svelte";

  const { data } = $props();
  const properties = data.properties;

  let search = $state("");

  let groups = $derived.by(() => {
    const groups: Record<string, typeof properties> = {};

    for (const property of properties.filter((property) =>
      property.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
    )) {
      if (!groups[property.type]) {
        groups[property.type] = [];
      }

      groups[property.type].push(property);
    }

    return Object.entries(groups);
  });
</script>

<svelte:head> <title>Staycraft</title> </svelte:head>

<header
  class="grid grid-cols-[1fr_auto_1fr] items-center border-b-2 border-neutral-200 bg-neutral-50 px-12 py-8 tracking-normal">
  <a href={resolve("/")} class="text-3xl font-bold uppercase no-underline!"
    >Staycraft</a
  >

  <div
    class="flex items-center rounded-full border border-neutral-300 bg-white text-sm font-semibold text-black shadow-lg">
    <div
      class="flex w-70 cursor-pointer flex-col rounded-l-full px-8 py-4 hover:bg-neutral-200">
      <span>Where</span>
      <input
        bind:value={search}
        placeholder="Search destinations"
        type="text"
        class="bg-transparent font-normal outline-none" >
    </div>

    <div class="w-px self-stretch bg-neutral-300"></div>

    <div
      class="flex w-70 cursor-pointer flex-col px-8 py-4 hover:bg-neutral-200">
      <span>When</span>
      <span class="text-neutral-500">Add dates</span>
    </div>

    <div class="w-px self-stretch bg-neutral-300"></div>

    <div
      class="flex w-70 cursor-pointer items-center justify-between rounded-r-full pl-8 [&:hover:not(:has(button:hover))]:bg-neutral-200">
      <div class="flex flex-col py-4">
        <span>Who</span>
        <span class="text-neutral-500">Add guests</span>
      </div>

      <button
        type="button"
        class="mr-2 flex h-14 w-14 items-center justify-center rounded-full bg-green-900 text-white"
        aria-label="Search">
        <Search class="h-[40%] w-[40%]" />
      </button>
    </div>
  </div>

  {#if data.user}
    <div class="justify-self-end">
      {#if data.user.admin}
        <details class="relative">
          <summary
            class="cursor-pointer list-none rounded-md px-4 py-2 hover:bg-neutral-100">
            CRUD
          </summary>

          <div
            class="absolute right-0 mt-2 min-w-48 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg">
            <a
              href={resolve("/admin/properties")}
              class="block px-4 py-2 text-black no-underline hover:bg-neutral-100">
              Properties
            </a>
            <a
              href={resolve("/admin/customers")}
              class="block px-4 py-2 text-black no-underline hover:bg-neutral-100">
              Customers
            </a>
            <a
              href={resolve("/admin/landlords")}
              class="block px-4 py-2 text-black no-underline hover:bg-neutral-100">
              Landlords
            </a>

            <div class="h-px bg-neutral-200"></div>

            <a
              href={resolve("/auth/logout")}
              class="block px-4 py-2 text-black no-underline hover:bg-neutral-100">
              Logout
            </a>
          </div>
        </details>
      {:else}
        <details class="relative">
          <summary
            class="cursor-pointer list-none rounded-md px-4 py-2 hover:bg-neutral-100">
            Account
          </summary>

          <div
            class="absolute right-0 mt-2 min-w-48 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg">
            <a
              href={resolve("/user/profile")}
              class="block px-4 py-2 text-black no-underline hover:bg-neutral-100">
              My Profile
            </a>
            <a
              href={resolve("/customer/bookings")}
              class="block px-4 py-2 text-black no-underline hover:bg-neutral-100">
              My Bookings
            </a>
            <!-- <a
              href={resolve("/help")}
              class="block px-4 py-2 text-black no-underline hover:bg-neutral-100">
              Help
            </a> -->

            <div class="h-px bg-neutral-200"></div>

            <a
              data-sveltekit-reload
              href={resolve("/auth/logout")}
              class="block px-4 py-2 text-black no-underline hover:bg-neutral-100">
              Logout
            </a>
          </div>
        </details>
      {/if}
    </div>
  {:else}
    <div class="justify-self-end">
      <a
        href={resolve("/auth/login")}
        class="text-black no-underline hover:underline"
        >Login</a
      >
    </div>
  {/if}
</header>

<div class="backgroundWhite container py-3">
  {#each groups as [ type, properties ]}
    <h2 class="pl-1 text-green-700"><b>{type}</b></h2>

    <div class="row">
      {#each properties as property}
        <div class="col-lg-4 col-md-6 pb-4 filter">
          <div
            class="card rounded border border-neutral-800 bg-white shadow-sm">
            <div class="card-body row pb-1">
              <div class="h5 col-8 line-clamp-2 min-h-10">{property.title}</div>

              <div class="col-4 text-end">
                <span class="text-info h4">€{property.pricePerNight}</span>
              </div>
            </div>

            <img
              class="card-img-top img-fluid d-block mx-auto mb-3"
              src={property.displayImage}
              alt={property.title} >

            <div class="card-body row p-1 px-3">
              <div class="col-6">
                <span class="badge text-dark bg-warning w-100 border p-2">
                  {property.type}
                </span>
              </div>

              <div class="col-6 border-0">
                <span class="badge bg-info w-100 border p-2">
                  {property.title}
                </span>
              </div>

              <div class="col-12 pt-2 text-justify text-[13px]">
                <p>{property.shortDescription}</p>
              </div>

              <div class="col-12 p-1">
                <a
                  href={resolve(`/properties/${property.id}`)}
                  class="btn btn-dark form-control btn-sm p-2"
                  style="height: 40px">
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/each}
</div>
