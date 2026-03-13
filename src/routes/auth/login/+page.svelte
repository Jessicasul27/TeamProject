<script lang="ts">
  import { resolve } from "$app/paths";
  import { schemaLogin } from "./schema";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import { superForm } from "sveltekit-superforms";
  import { invalidate } from "$app/navigation";

  const { data } = $props();
  const { form, errors, constraints, message, enhance } = superForm(data.form, {
    validators: zod4Client(schemaLogin),
    validationMethod: "onblur",
    onResult: async () => {
      await invalidate("auth:session");
    },
  });
</script>

<div class="flex w-full justify-center py-12">
  <form
    method="POST"
    novalidate
    class="card w-full max-w-sm border border-base-300 bg-base-100 shadow-sm">
    <div class="card-body gap-4">
      <h1 class="card-title text-2xl">Log in</h1>

      {#if $message}
        <div class="alert alert-error py-2 text-sm">
          <span>{$message}</span>
        </div>
      {/if}

      <div class="form-control w-full">
        <label for="email" class="label">
          <span class="label-text font-medium">Email</span>
        </label>

        <input
          bind:value={$form.email}
          id="email"
          name="email"
          type="email"
          class="input input-bordered w-full"
          autocomplete="username"
          {...$constraints.email} >

        {#if $errors.email}
          <p id="email-error" class="label text-error text-sm">
            {$errors.email}
          </p>
        {/if}
      </div>

      <div class="form-control w-full">
        <label for="password" class="label">
          <span class="label-text font-medium">Password</span>
        </label>

        <input
          bind:value={$form.password}
          id="password"
          name="password"
          type="password"
          class="input input-bordered w-full"
          autocomplete="current-password"
          {...$constraints.password} >

        {#if $errors.password}
          <p id="password-error" class="label text-error text-sm">
            {$errors.password}
          </p>
        {/if}
      </div>

      <label for="rememberMe" class="label cursor-pointer justify-start gap-3">
        <input
          bind:checked={$form.rememberMe}
          id="rememberMe"
          name="rememberMe"
          type="checkbox"
          class="checkbox checkbox-sm" >
        <span class="label-text">Remember me</span>
      </label>

      <button type="submit" class="btn btn-success mt-2">Log in</button>

      <div class="text-sm text-base-content/70">
        <span>Don't have an account?</span>
        <a href={resolve("/auth/register")} class="link link-hover">
          Create one
        </a>
      </div>
    </div>
  </form>
</div>
