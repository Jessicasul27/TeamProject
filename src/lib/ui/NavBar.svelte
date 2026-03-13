<script lang="ts">
  import { resolve } from "$app/paths";
  import type { User } from "$lib/server/db/entities/user";
  import { Search } from "lucide-svelte";
  import NavDropdown from "./NavDropdown.svelte";

  let {
    home,
    user,
    search = $bindable(),
  }: {
    home: boolean;
    user: User | null;
    search: string;
  } = $props();
</script>

<nav
  class={`grid grid-cols-[1fr_auto_1fr] px-16 py-4 items-center text-sm text-base-content shadow-md ${home ? "h-32" : "h-20"}`}>
  <a href={resolve("/")} class="text-3xl font-bold uppercase no-underline">
    Staycraft
  </a>

  {#if home}
    <div
      class="flex items-center rounded-full border border-base-300 bg-base-200/40">
      <div
        class="flex w-70 cursor-pointer flex-col rounded-l-full px-8 py-4 hover:bg-base-200">
        <span class="font-semibold">Where</span>
        <input
          bind:value={search}
          placeholder="Search destinations"
          type="text"
          class="bg-transparent outline-none placeholder:text-base-content/50" >
      </div>

      <div class="w-px self-stretch bg-base-300"></div>

      <div
        class="flex w-70 cursor-pointer flex-col px-8 py-4 hover:bg-base-200">
        <span class="font-semibold">When</span>
        <span class="text-base-content/50">Add dates</span>
      </div>

      <div class="w-px self-stretch bg-base-300"></div>

      <div
        class="flex w-70 cursor-pointer items-center justify-between rounded-r-full pl-8 [&:hover:not(:has(button:hover))]:bg-base-200">
        <div class="flex flex-col py-4">
          <span class="font-semibold">Who</span>
          <span class="text-base-content/50">Add guests</span>
        </div>

        <button
          type="button"
          class="btn btn-circle btn-primary mr-2 h-14 min-h-14 w-14 border-0 shadow-none"
          aria-label="Search">
          <Search class="h-5 w-5" />
        </button>
      </div>
    </div>

    <NavDropdown {user} />
  {:else}
    <div></div>
    <NavDropdown {user} />
  {/if}
</nav>
