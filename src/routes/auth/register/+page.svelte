<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import { registerSchema } from "$lib/schemas/register";
  import { resolve } from "$app/paths";

  let { data } = $props();

  const { form, errors, enhance } = superForm(data.form, {
    validators: zod4Client(registerSchema),
    validationMethod: "onblur",
  });
</script>

<div class="flex justify-center py-16">
  <form
    use:enhance
    method="POST"
    novalidate
    class="flex w-200 flex-col gap-6 rounded-3xl border border-neutral-300 bg-white p-10">
    <h1 class="text-4xl font-semibold tracking-wide">Create account</h1>

    <div class="flex flex-col gap-3">
      <span class="text-sm font-medium">Register as</span>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <input
            id="role-customer"
            name="role"
            type="radio"
            value="customer"
            bind:group={$form.role}
            class="peer hidden" >

          <label
            for="role-customer"
            class="flex! min-h-36 cursor-pointer flex-col rounded-2xl border
									 border-neutral-300 bg-white p-6 transition
									 peer-checked:border-green-600 peer-checked:bg-green-50
								 	 peer-checked:ring-1 peer-checked:ring-green-600 hover:border-green-600 hover:bg-green-50">
            <span class="text-lg font-semibold">Customer</span>
            <span class="mt-2 text-sm text-neutral-600">
              Book properties, manage stays, and browse listings.
            </span>
          </label>
        </div>

        <div>
          <input
            id="role-landlord"
            name="role"
            type="radio"
            value="landlord"
            bind:group={$form.role}
            class="peer hidden" >

          <label
            for="role-landlord"
            class="flex! min-h-36 cursor-pointer flex-col rounded-2xl border
							border-neutral-300 bg-white p-6 transition
							peer-checked:border-green-600 peer-checked:bg-green-50
							peer-checked:ring-1 peer-checked:ring-green-600 hover:border-green-600 hover:bg-green-50">
            <span class="text-lg font-semibold">Landlord</span>
            <span class="mt-2 text-sm text-neutral-600">
              List properties, manage bookings, and host customers.
            </span>
          </label>
        </div>
      </div>

      {#if $errors.role}
        <span class="text-xs text-red-600">{$errors.role[0]}</span>
      {/if}
    </div>

    <div class="flex flex-col gap-1">
      <label for="firstName" class="text-sm font-medium">First name</label>
      <input
        id="firstName"
        name="firstName"
        bind:value={$form.firstName}
        class="h-12 rounded-xl border border-neutral-300 px-4" >
      {#if $errors.firstName}
        <span class="text-xs text-red-600">{$errors.firstName[0]}</span>
      {/if}
    </div>

    <div class="flex flex-col gap-1">
      <label for="lastName" class="text-sm font-medium">Last name</label>
      <input
        id="lastName"
        name="lastName"
        bind:value={$form.lastName}
        class="h-12 rounded-xl border border-neutral-300 px-4" >
      {#if $errors.lastName}
        <span class="text-xs text-red-600">{$errors.lastName[0]}</span>
      {/if}
    </div>

    <div class="flex flex-col gap-1">
      <label for="email" class="text-sm font-medium">Email</label>
      <input
        bind:value={$form.email}
        id="email"
        name="email"
        type="email"
        autocomplete="username"
        class="h-12 rounded-xl border border-neutral-300 px-4" >
      {#if $errors.email}
        <span class="text-xs text-red-600">{$errors.email[0]}</span>
      {/if}
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col gap-1">
        <label for="password" class="text-sm font-medium">Password</label>
        <input
          bind:value={$form.password}
          id="password"
          name="password"
          type="password"
          autocomplete="new-password"
          class="h-12 rounded-xl border border-neutral-300 px-4" >
        {#if $errors.password}
          <span class="text-xs text-red-600">{$errors.password[0]}</span>
        {/if}
      </div>

      <div class="flex flex-col gap-1">
        <label for="confirmPassword" class="text-sm font-medium"
          >Confirm password</label
        >
        <input
          bind:value={$form.confirmPassword}
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autocomplete="new-password"
          class="h-12 rounded-xl border border-neutral-300 px-4" >
        {#if $errors.confirmPassword}
          <span class="text-xs text-red-600">{$errors.confirmPassword[0]}</span>
        {/if}
      </div>
    </div>

    <button
      type="submit"
      class="h-12 rounded-2xl! bg-green-600 font-semibold text-white">
      Register
    </button>

    <div class="text-sm text-neutral-600">
      <a href={resolve("/auth/login")} class="underline">
        Already have an account?
      </a>
    </div>
  </form>
</div>
