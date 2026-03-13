<script lang="ts">
	import { resolve } from "$app/paths";
	import { superForm } from "sveltekit-superforms";

	let { data } = $props();

	const { form, errors, constraints, message, enhance } = superForm(data.form);
</script>

<div class="tw:flex tw:w-full tw:justify-center tw:py-12">
	<form method="POST" use:enhance class="tw:flex tw:w-full tw:max-w-sm tw:flex-col tw:gap-3 tw:rounded-2xl tw:border tw:border-neutral-300 tw:p-6">
		<h1 class="tw:text-xl tw:font-semibold">Log in</h1>

		{#if $message}
			<div class="tw:text-sm tw:text-red-600">{$message}</div>
		{/if}

		<input type="hidden" name="returnUrl" bind:value={$form.returnUrl} />

		<div class="tw:flex tw:flex-col tw:gap-1">
			<label for="email" class="tw:text-sm tw:font-medium">Email</label>
			<input
				id="email"
				name="email"
				type="email"
				bind:value={$form.email}
				{...$constraints.email}
				class="tw:rounded-xl tw:border tw:border-neutral-300 tw:px-3 tw:py-2"
				autocomplete="username"
				aria-invalid={$errors.email ? "true" : undefined}
			/>
			{#if $errors.email}
				<span class="tw:text-xs tw:text-red-600">{$errors.email}</span>
			{/if}
		</div>

		<div class="tw:flex tw:flex-col tw:gap-1">
			<label for="password" class="tw:text-sm tw:font-medium">Password</label>
			<input
				id="password"
				name="password"
				type="password"
				bind:value={$form.password}
				{...$constraints.password}
				class="tw:rounded-xl tw:border tw:border-neutral-300 tw:px-3 tw:py-2"
				autocomplete="current-password"
				aria-invalid={$errors.password ? "true" : undefined}
			/>
			{#if $errors.password}
				<span class="tw:text-xs tw:text-red-600">{$errors.password}</span>
			{/if}
		</div>

		<label for="rememberMe" class="tw:flex tw:items-center tw:gap-2 tw:text-sm">
			<input id="rememberMe" name="rememberMe" type="checkbox" bind:checked={$form.rememberMe} class="tw:accent-neutral-900" />
			<span>Remember me</span>
		</label>

		<button type="submit" class="tw:mt-2 tw:rounded-2xl! tw:bg-green-600 tw:px-4 tw:py-2 tw:font-semibold tw:text-white"> Log in </button>

		<div class="tw:flex tw:gap-2 tw:text-sm tw:text-neutral-600">
			<a href={resolve("/auth/register")} class="tw:underline"> Create account </a>
		</div>
	</form>
</div>
