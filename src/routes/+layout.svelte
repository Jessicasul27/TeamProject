<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";

	import { page } from "$app/state";
	import { resolve } from "$app/paths";

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if page.url.pathname !== "/"}
	<header>
		<nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
			<div class="container">
				<a href={resolve("/")} class="navbar-brand">Staycraft</a>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target=".navbar-collapse"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>

				<div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
					<ul class="navbar-nav flex-grow-1">
						<li class="nav-item">
							<a href={resolve("/")} class="nav-link text-dark">Home</a>
						</li>

						{#if data.user}
							{#if data.user.admin}
								<li class="nav-item dropdown nav-justify-content-end">
									<a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">CRUD</a>
									<div class="dropdown-menu">
										<a href={resolve("/admin/properties")} class="dropdown-item">Properties</a>
										<a href={resolve("/admin/customers")} class="dropdown-item">Customers</a>
										<a href={resolve("/admin/landlords")} class="dropdown-item">Landlords</a>
										<div class="dropdown-divider"></div>
										<a href={resolve("/auth/logout")} class="dropdown-item">Logout</a>
									</div>
								</li>
							{/if}

							{#if data.user.customer}
								<li class="nav-item dropdown nav-justify-content-end">
									<a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Account</a>
									<div class="dropdown-menu">
										<a href="#" class="dropdown-item">My Account</a>
										<a href="#" class="dropdown-item">My Booking</a>
										<a href="#" class="dropdown-item">Help</a>

										<div class="dropdown-divider"></div>
										<a href={resolve("/auth/logout")} class="dropdown-item">Logout</a>
									</div>
								</li>
							{/if}

							{#if data.user.landlord}
								<li class="nav-item dropdown nav-justify-content-end">
									<a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Account</a>
									<div class="dropdown-menu">
										<a href="#" class="dropdown-item">My Account</a>
										<a href="#" class="dropdown-item">My Booking</a>
										<a href="#" class="dropdown-item">Help</a>

										<div class="dropdown-divider"></div>
										<a href={resolve("/auth/logout")} class="dropdown-item">Logout</a>
									</div>
								</li>
							{:else}
								<li class="nav-item nav-justify-content-end">
									<a href={resolve("/auth/login")} class="nav-link text-dark">Login</a>
								</li>
							{/if}
						{/if}
					</ul>
				</div>
			</div>
		</nav>
	</header>
{/if}

<main class="pb-3">
	{@render children()}
</main>

<footer class="tw:flex tw:justify-center tw:border-t tw:border-neutral-200 tw:p-4">
	&copy; 2026 - TeamProject -&nbsp;<a href={resolve("/")}>Privacy</a>
</footer>
