<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import { page } from "$app/state";
  import { resolve } from "$app/paths";
  import { Toaster } from "svelte-sonner";
  import Navbar from "$lib/ui/Navbar.svelte";

  const { children, data } = $props();
  const user = $derived(data.user);

  let search = $state("");
  let home = $derived(page.url.pathname === "/");
</script>

<svelte:head> <link rel="icon" href={favicon}> </svelte:head>

<Toaster position="bottom-right" />

<div class="flex flex-col min-h-screen">
  <Navbar bind:search {user} {home} />

  <main class="flex flex-1 items-center justify-center mx-[12vmax]">
    {@render children()}
  </main>

  <footer class="flex justify-center border-t border-neutral-200 p-4">
    &copy; 2026 - TeamProject -&nbsp;<a href={resolve("/")}>Privacy</a>
  </footer>
</div>
