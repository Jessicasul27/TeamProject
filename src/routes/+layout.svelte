<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import { page } from "$app/state";
  import { Toaster } from "svelte-sonner";
  import Navbar from "$lib/ui/Navbar.svelte";

  const { children, data } = $props();

  let home = $derived(page.url.pathname === "/");
</script>

<svelte:head> <link rel="icon" href={favicon}> </svelte:head>

<Toaster position="bottom-right" />

<div class="flex min-h-screen flex-col">
  <Navbar {home} user={data.user} counties={data.counties} />

  <main class="mx-[12vmax] flex flex-1 items-center justify-center">
    {@render children()}
  </main>

  <footer class="flex justify-center border-t border-neutral-200 p-4">
    &copy; 2026 - StayCraft
  </footer>
</div>
