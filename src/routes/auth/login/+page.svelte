<script lang="ts">
  import { resolve } from "$app/paths";
  import { loginSchema } from "$lib/schemas/login.js";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import { superForm } from "sveltekit-superforms";

  let { data } = $props();

  const { form, errors, constraints, message, enhance } = superForm(data.form, {
    validators: zod4Client(loginSchema),
    validationMethod: "onblur",
  });
</script>

<div class="flex w-full justify-center py-12">
  <form
    use:enhance
    method="POST"
    novalidate
    class="flex w-full max-w-sm flex-col gap-3 rounded-2xl border border-neutral-300 p-6">
    <h1 class="text-xl font-semibold">Log in</h1>

    {#if $message}
      <div class="text-sm text-red-600">{$message}</div>
    {/if}

    <input type="hidden" name="returnUrl" bind:value={$form.returnUrl} >

    <div class="flex flex-col gap-1">
      <label for="email" class="text-sm font-medium">Email</label>
      <input
        bind:value={$form.email}
        id="email"
        name="email"
        type="email"
        class="rounded-xl border border-neutral-300 px-3 py-2"
        autocomplete="username"
        {...$constraints.email} >
      {#if $errors.email}
        <span class="text-xs text-red-600">{$errors.email}</span>
      {/if}
    </div>

    <div class="flex flex-col gap-1">
      <label for="password" class="text-sm font-medium">Password</label>
      <input
        bind:value={$form.password}
        id="password"
        name="password"
        type="password"
        class="rounded-xl border border-neutral-300 px-3 py-2"
        autocomplete="current-password"
        {...$constraints.password} >
      {#if $errors.password}
        <span class="text-xs text-red-600">{$errors.password}</span>
      {/if}
    </div>

    <label for="rememberMe" class="flex items-center gap-2 text-sm">
      <input
        id="rememberMe"
        name="rememberMe"
        type="checkbox"
        bind:checked={$form.rememberMe}
        class="accent-neutral-900" >
      <span>Remember me</span>
    </label>

    <button
      type="submit"
      class="mt-2 rounded-2xl! bg-green-600 px-4 py-2 font-semibold text-white">
      Log in
    </button>

    <div class="flex gap-2 text-sm text-neutral-600">
      <a href={resolve("/auth/register")} class="underline"> Create account </a>
    </div>
  </form>
</div>
