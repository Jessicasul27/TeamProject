<script lang="ts">
	import { superForm } from "sveltekit-superforms";
	import { zod4Client } from "sveltekit-superforms/adapters";
	import { registerSchema } from "$lib/schemas/register";
	import { resolve } from "$app/paths";

	let { data } = $props();

	const { form, errors, enhance } = superForm(data.form, {
		validators: zod4Client(registerSchema),
		validationMethod: "oninput",
	});
</script>

<div class="tw:flex tw:justify-center tw:py-16">
	<form method="POST" use:enhance novalidate class="tw:flex tw:w-200 tw:flex-col tw:gap-6 tw:rounded-3xl tw:border tw:border-neutral-300 tw:bg-white tw:p-10">
		<h1 class="tw:text-4xl tw:font-semibold tw:tracking-wide">Create account</h1>

		<div class="tw:flex tw:flex-col tw:gap-3">
			<span class="tw:text-sm tw:font-medium">Register as</span>

			<div class="tw:grid tw:grid-cols-2 tw:gap-4">
				<div>
					<input id="role-customer" name="role" type="radio" value="customer" bind:group={$form.role} class="tw:peer tw:hidden" />

					<label
						for="role-customer"
						class="tw:flex! tw:min-h-36 tw:cursor-pointer tw:flex-col tw:rounded-2xl tw:border
									 tw:border-neutral-300 tw:bg-white tw:p-6 tw:transition
									 tw:peer-checked:border-green-600 tw:peer-checked:bg-green-50
								 	 tw:peer-checked:ring-1 tw:peer-checked:ring-green-600 tw:hover:border-green-600 tw:hover:bg-green-50"
					>
						<span class="tw:text-lg tw:font-semibold">Customer</span>
						<span class="tw:mt-2 tw:text-sm tw:text-neutral-600"> Book properties, manage stays, and browse listings. </span>
					</label>
				</div>

				<div>
					<input id="role-landlord" name="role" type="radio" value="landlord" bind:group={$form.role} class="tw:peer tw:hidden" />

					<label
						for="role-landlord"
						class="tw:flex! tw:min-h-36 tw:cursor-pointer tw:flex-col tw:rounded-2xl tw:border
							tw:border-neutral-300 tw:bg-white tw:p-6 tw:transition
							tw:peer-checked:border-green-600 tw:peer-checked:bg-green-50
							tw:peer-checked:ring-1 tw:peer-checked:ring-green-600 tw:hover:border-green-600 tw:hover:bg-green-50"
					>
						<span class="tw:text-lg tw:font-semibold">Landlord</span>
						<span class="tw:mt-2 tw:text-sm tw:text-neutral-600"> List properties, manage bookings, and host customers. </span>
					</label>
				</div>
			</div>

			{#if $errors.role}
				<span class="tw:text-xs tw:text-red-600">{$errors.role[0]}</span>
			{/if}
		</div>

		<div class="tw:flex tw:flex-col tw:gap-1">
			<label for="firstName" class="tw:text-sm tw:font-medium">First name</label>
			<input id="firstName" name="firstName" bind:value={$form.firstName} class="tw:h-12 tw:rounded-xl tw:border tw:border-neutral-300 tw:px-4" />
			{#if $errors.firstName}
				<span class="tw:text-xs tw:text-red-600">{$errors.firstName[0]}</span>
			{/if}
		</div>

		<div class="tw:flex tw:flex-col tw:gap-1">
			<label for="lastName" class="tw:text-sm tw:font-medium">Last name</label>
			<input id="lastName" name="lastName" bind:value={$form.lastName} class="tw:h-12 tw:rounded-xl tw:border tw:border-neutral-300 tw:px-4" />
			{#if $errors.lastName}
				<span class="tw:text-xs tw:text-red-600">{$errors.lastName[0]}</span>
			{/if}
		</div>

		<div class="tw:flex tw:flex-col tw:gap-1">
			<label for="email" class="tw:text-sm tw:font-medium">Email</label>
			<input
				bind:value={$form.email}
				id="email"
				name="email"
				type="email"
				autocomplete="username"
				class="tw:h-12 tw:rounded-xl tw:border tw:border-neutral-300 tw:px-4"
			/>
			{#if $errors.email}
				<span class="tw:text-xs tw:text-red-600">{$errors.email[0]}</span>
			{/if}
		</div>

		<div class="tw:grid tw:grid-cols-2 tw:gap-4">
			<div class="tw:flex tw:flex-col tw:gap-1">
				<label for="password" class="tw:text-sm tw:font-medium">Password</label>
				<input
					bind:value={$form.password}
					id="password"
					name="password"
					type="password"
					autocomplete="new-password"
					class="tw:h-12 tw:rounded-xl tw:border tw:border-neutral-300 tw:px-4"
				/>
				{#if $errors.password}
					<span class="tw:text-xs tw:text-red-600">{$errors.password[0]}</span>
				{/if}
			</div>

			<div class="tw:flex tw:flex-col tw:gap-1">
				<label for="confirmPassword" class="tw:text-sm tw:font-medium">Confirm password</label>
				<input
					bind:value={$form.confirmPassword}
					id="confirmPassword"
					name="confirmPassword"
					type="password"
					autocomplete="new-password"
					class="tw:h-12 tw:rounded-xl tw:border tw:border-neutral-300 tw:px-4"
				/>
				{#if $errors.confirmPassword}
					<span class="tw:text-xs tw:text-red-600">{$errors.confirmPassword[0]}</span>
				{/if}
			</div>
		</div>

		<button type="submit" class="tw:h-12 tw:rounded-2xl! tw:bg-green-600 tw:font-semibold tw:text-white"> Register </button>

		<div class="tw:text-sm tw:text-neutral-600">
			<a href={resolve("/auth/login")} class="tw:underline"> Already have an account? </a>
		</div>
	</form>
</div>
