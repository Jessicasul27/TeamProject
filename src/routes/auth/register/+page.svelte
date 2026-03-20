<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import { registerClientAdapter } from "./schema";
  import { resolve } from "$app/paths";
  import { invalidate } from "$app/navigation";

  const { data } = $props();
  const { form, errors, enhance } = superForm(data.form, {
    validators: registerClientAdapter,
    validationMethod: "onblur",

    // this is only needed for register/login
    onResult: async () => {
      await invalidate("auth:session");
    },
  });
</script>

<div class="flex justify-center py-16">
  <form
    use:enhance
    method="POST"
    novalidate
    class="card w-full max-w-4xl border border-base-300 bg-base-100 shadow-sm">
    <div class="card-body gap-6 p-10">
      <h1 class="card-title text-4xl font-semibold tracking-wide">
        Create account
      </h1>

      <fieldset class="form-control gap-3">
        <legend class="text-sm font-medium mb-2">Register as</legend>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <input
              bind:group={$form.role}
              id="role-customer"
              name="role"
              type="radio"
              value="customer"
              class="peer sr-only">

            <label
              for="role-customer"
              class="flex min-h-36 cursor-pointer flex-col rounded-box border border-base-300 bg-base-100 p-6 
                     transition-colors peer-checked:border-success peer-checked:bg-success/20 hover:border-success hover:bg-success/40">
              <span class="text-lg font-semibold">Customer</span>
              <span class="mt-2 text-sm text-base-content/70">
                Book properties, manage stays, and browse listings.
              </span>
            </label>
          </div>

          <div>
            <input
              bind:group={$form.role}
              id="role-landlord"
              name="role"
              type="radio"
              value="landlord"
              class="peer sr-only">

            <label
              for="role-landlord"
              class="flex min-h-36 cursor-pointer flex-col rounded-box border border-base-300 bg-base-100 p-6 
                     transition-colors peer-checked:border-success peer-checked:bg-success/20 hover:border-success hover:bg-success/20">
              <span class="text-lg font-semibold">Landlord</span>
              <span class="mt-2 text-sm text-base-content/70">
                List properties, manage bookings, and host customers.
              </span>
            </label>
          </div>
        </div>

        {#if $errors.role}
          <p class="text-sm text-error">{$errors.role[0]}</p>
        {/if}
      </fieldset>

      <div class="form-control w-full">
        <label for="firstName" class="label">
          <span class="label-text font-medium">First name</span>
        </label>

        <input
          bind:value={$form.firstName}
          id="firstName"
          name="firstName"
          class="input input-bordered w-full">

        {#if $errors.firstName}
          <p class="mt-1 text-sm text-error">{$errors.firstName[0]}</p>
        {/if}
      </div>

      <div class="form-control w-full">
        <label for="lastName" class="label">
          <span class="label-text font-medium">Last name</span>
        </label>

        <input
          bind:value={$form.lastName}
          id="lastName"
          name="lastName"
          class="input input-bordered w-full">

        {#if $errors.lastName}
          <p class="mt-1 text-sm text-error">{$errors.lastName[0]}</p>
        {/if}
      </div>

      <div class="form-control w-full">
        <label for="email" class="label">
          <span class="label-text font-medium">Email</span>
        </label>

        <input
          bind:value={$form.email}
          id="email"
          name="email"
          type="email"
          autocomplete="username"
          class="input input-bordered w-full">

        {#if $errors.email}
          <p class="mt-1 text-sm text-error">{$errors.email[0]}</p>
        {/if}
      </div>

      <div class="form-control w-full">
        <label for="phoneNumber" class="label">
          <span class="label-text font-medium">Phone number</span>
        </label>

        <input
          bind:value={$form.phoneNumber}
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          autocomplete="tel"
          class="input input-bordered w-full">

        {#if $errors.phoneNumber}
          <p class="mt-1 text-sm text-error">{$errors.phoneNumber[0]}</p>
        {/if}
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="form-control w-full">
          <label for="password" class="label">
            <span class="label-text font-medium">Password</span>
          </label>

          <input
            bind:value={$form.password}
            id="password"
            name="password"
            type="password"
            autocomplete="new-password"
            class="input input-bordered w-full">

          {#if $errors.password}
            <p class="mt-1 text-sm text-error">{$errors.password[0]}</p>
          {/if}
        </div>

        <div class="form-control w-full">
          <label for="confirmPassword" class="label">
            <span class="label-text font-medium">Confirm password</span>
          </label>

          <input
            bind:value={$form.confirmPassword}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autocomplete="new-password"
            class="input input-bordered w-full">

          {#if $errors.confirmPassword}
            <p class="mt-1 text-sm text-error">{$errors.confirmPassword[0]}</p>
          {/if}
        </div>
      </div>

      <button type="submit" class="btn btn-success">Register</button>

      <div class="text-sm text-base-content/70">
        <a href={resolve("/auth/login")} class="link link-hover">
          Already have an account?
        </a>
      </div>
    </div>
  </form>
</div>
