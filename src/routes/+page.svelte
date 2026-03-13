<script lang="ts">
	import { resolve } from "$app/paths";
	import { Search } from "lucide-svelte";

	const { data } = $props();
	const properties = data.properties;

	let search = $state("");

	let groups = $derived.by(() => {
		const groups: Record<string, typeof properties> = {};

		for (const property of properties.filter((property) => property.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))) {
			if (!groups[property.type]) {
				groups[property.type] = [];
			}

			groups[property.type].push(property);
		}

		return Object.entries(groups);
	});
</script>

<svelte:head>
	<title>Staycraft</title>
</svelte:head>

<header class="tw:grid tw:grid-cols-[1fr_auto_1fr] tw:items-center tw:border-b-2 tw:border-neutral-200 tw:bg-neutral-50 tw:px-12 tw:py-8 tw:tracking-normal">
	<a href={resolve("/")} class="tw:text-3xl tw:font-bold tw:uppercase tw:no-underline!">Staycraft</a>

	<div class="tw:flex tw:items-center tw:rounded-full tw:border tw:border-neutral-300 tw:bg-white tw:text-sm tw:font-semibold tw:text-black tw:shadow-lg">
		<div class="tw:flex tw:w-70 tw:cursor-pointer tw:flex-col tw:rounded-l-full tw:px-8 tw:py-4 tw:hover:bg-neutral-200">
			<span>Where</span>
			<input bind:value={search} placeholder="Search destinations" type="text" class="tw:bg-transparent tw:font-normal tw:outline-none" />
		</div>

		<div class="tw:w-px tw:self-stretch tw:bg-neutral-300"></div>

		<div class="tw:flex tw:w-70 tw:cursor-pointer tw:flex-col tw:px-8 tw:py-4 tw:hover:bg-neutral-200">
			<span>When</span>
			<span class="tw:text-neutral-500">Add dates</span>
		</div>

		<div class="tw:w-px tw:self-stretch tw:bg-neutral-300"></div>

		<div
			class="tw:flex tw:w-70 tw:cursor-pointer tw:items-center tw:justify-between tw:rounded-r-full tw:pl-8 tw:[&:hover:not(:has(button:hover))]:bg-neutral-200"
		>
			<div class="tw:flex tw:flex-col tw:py-4">
				<span>Who</span>
				<span class="tw:text-neutral-500">Add guests</span>
			</div>

			<button
				type="button"
				class="tw:mr-2! tw:flex tw:h-14 tw:w-14 tw:items-center tw:justify-center tw:rounded-full! tw:bg-green-900 tw:text-white"
				aria-label="Search"
			>
				<Search class="tw:h-[40%] tw:w-[40%]" />
			</button>
		</div>
	</div>

	{#if data.user}
		<div class="tw:justify-self-end">
			{#if data.user.admin}
				<details class="tw:relative">
					<summary class="tw:cursor-pointer tw:list-none tw:rounded-md tw:px-4 tw:py-2 tw:hover:bg-neutral-100"> CRUD </summary>

					<div class="tw:absolute tw:right-0 tw:mt-2 tw:min-w-48 tw:overflow-hidden tw:rounded-lg tw:border tw:border-neutral-200 tw:bg-white tw:shadow-lg">
						<a href={resolve("/admin/properties")} class="tw:block tw:px-4 tw:py-2 tw:text-black tw:no-underline tw:hover:bg-neutral-100"> Properties </a>
						<a href={resolve("/admin/customers")} class="tw:block tw:px-4 tw:py-2 tw:text-black tw:no-underline tw:hover:bg-neutral-100"> Customers </a>
						<a href={resolve("/admin/landlords")} class="tw:block tw:px-4 tw:py-2 tw:text-black tw:no-underline tw:hover:bg-neutral-100"> Landlords </a>

						<div class="tw:h-px tw:bg-neutral-200"></div>

						<a href={resolve("/auth/logout")} class="tw:block tw:px-4 tw:py-2 tw:text-black tw:no-underline tw:hover:bg-neutral-100"> Logout </a>
					</div>
				</details>
			{:else}
				<details class="tw:relative">
					<summary class="tw:cursor-pointer tw:list-none tw:rounded-md tw:px-4 tw:py-2 tw:hover:bg-neutral-100"> Account </summary>

					<div class="tw:absolute tw:right-0 tw:mt-2 tw:min-w-48 tw:overflow-hidden tw:rounded-lg tw:border tw:border-neutral-200 tw:bg-white tw:shadow-lg">
						<a href={resolve("/account")} class="tw:block tw:px-4 tw:py-2 tw:text-black tw:no-underline tw:hover:bg-neutral-100"> My Account </a>
						<a href={resolve("/bookings")} class="tw:block tw:px-4 tw:py-2 tw:text-black tw:no-underline tw:hover:bg-neutral-100"> My Bookings </a>
						<a href={resolve("/help")} class="tw:block tw:px-4 tw:py-2 tw:text-black tw:no-underline tw:hover:bg-neutral-100"> Help </a>

						<div class="tw:h-px tw:bg-neutral-200"></div>

						<a href={resolve("/auth/logout")} class="tw:block tw:px-4 tw:py-2 tw:text-black tw:no-underline tw:hover:bg-neutral-100"> Logout </a>
					</div>
				</details>
			{/if}
		</div>
	{:else}
		<div class="tw:justify-self-end">
			<a href={resolve("/auth/login")} class="tw:text-black tw:no-underline tw:hover:underline">Login</a>
		</div>
	{/if}
</header>

<div class="container backgroundWhite tw:py-3">
	{#each groups as [type, properties]}
		<h2 class="tw:pl-1 tw:text-green-700">
			<b>{type}</b>
		</h2>

		<div class="row">
			{#each properties as property}
				<div class="col-lg-4 col-md-6 pb-4 filter">
					<div class="card bg-white rounded shadow-sm tw:border tw:border-neutral-800">
						<div class="card-body pb-1 row">
							<div class="col-8 h5 tw:line-clamp-2 tw:min-h-10">
								{property.title}
							</div>

							<div class="col-4 text-end">
								<span class="text-info h4">€{property.pricePerNight}</span>
							</div>
						</div>

						<img class="card-img-top img-fluid d-block mx-auto mb-3" src={property.displayImage} alt={property.title} />

						<div class="card-body p-1 px-3 row">
							<div class="col-6">
								<span class="badge p-2 border w-100 text-dark bg-warning">
									{property.type}
								</span>
							</div>

							<div class="col-6 border-0">
								<span class="badge p-2 border w-100 bg-info">
									{property.title}
								</span>
							</div>

							<div class="col-12 pt-2 tw:text-justify tw:text-[13px]">
								<p>{property.shortDescription}</p>
							</div>

							<div class="col-12 p-1">
								<a href={resolve(`/properties/${property.id}`)} class="btn btn-dark form-control btn-sm p-2" style="height: 40px"> View Details </a>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/each}
</div>
