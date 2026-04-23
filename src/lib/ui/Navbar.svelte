<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import type { User } from "$lib/server/db/entities/user";
  import { Minus, Plus, Search } from "lucide-svelte";
  import NavDropdown from "./NavDropdown.svelte";
  import SearchDatePicker from "./SearchDatePicker.svelte";

  let {
    home,
    user,
    counties,
  }: {
    home: boolean;
    user: User | null;
    counties: string[];
  } = $props();

  function getNumberParam(name: string) {
    const value = Number(page.url.searchParams.get(name) ?? 0);

    if (Number.isNaN(value) || value < 0) {
      return 0;
    }

    return value;
  }

  function getDateParam(name: string) {
    const value = Number(page.url.searchParams.get(name) ?? 0);

    if (!value || Number.isNaN(value)) {
      return null;
    }

    const date = new Date(value);
    date.setHours(0, 0, 0, 0);

    return date;
  }

  function formatShortDate(date: Date | null) {
    if (!date) {
      return "";
    }

    return date.toLocaleString("default", {
      month: "short",
      day: "2-digit",
    });
  }

  let county = $state(page.url.searchParams.get("county") ?? "");
  let adults = $state(getNumberParam("adults"));
  let children = $state(getNumberParam("children"));
  let infants = $state(getNumberParam("infants"));
  let checkIn = $state<Date | null>(getDateParam("checkIn"));
  let checkOut = $state<Date | null>(getDateParam("checkOut"));

  let datesOpen = $state(false);
  let guestsOpen = $state(false);

  let totalGuests = $derived(adults + children + infants);

  let dateLabel = $derived.by(() => {
    if (!checkIn && !checkOut) {
      return "Add dates";
    }

    if (checkIn && !checkOut) {
      return `${formatShortDate(checkIn)} - Add checkout`;
    }

    return `${formatShortDate(checkIn)} - ${formatShortDate(checkOut)}`;
  });

  let guestsLabel = $derived(
    totalGuests > 0
      ? `${totalGuests} guest${totalGuests !== 1 ? "s" : ""}`
      : "Add guests",
  );

  function closePopups() {
    datesOpen = false;
    guestsOpen = false;
  }

  function changeGuestCount(
    category: "adults" | "children" | "infants",
    amount: number,
  ) {
    if (category === "adults") {
      adults = Math.max(0, adults + amount);
      return;
    }

    if (category === "children") {
      children = Math.max(0, children + amount);
      return;
    }

    infants = Math.max(0, infants + amount);
  }

  $effect(() => {
    page.url.search;

    county = page.url.searchParams.get("county") ?? "";
    adults = getNumberParam("adults");
    children = getNumberParam("children");
    infants = getNumberParam("infants");
    checkIn = getDateParam("checkIn");
    checkOut = getDateParam("checkOut");
  });
</script>

<svelte:document onclick={closePopups} />

<nav
  class={`grid grid-cols-[1fr_auto_1fr] px-16 py-4 items-center text-sm text-base-content shadow-md ${home ? "h-32" : "h-20"}`}>
  <div>
    <a href={resolve("/")} class="text-3xl font-bold uppercase no-underline">
      Staycraft
    </a>
  </div>

  {#if home}
    <form
      method="GET"
      action={resolve("/")}
      class="flex items-center rounded-full border border-base-300 bg-base-200/40">
      <div
        class="flex w-70 flex-col rounded-l-full px-8 py-4 hover:bg-base-200">
        <span class="font-semibold">Where</span>

        <select
          bind:value={county}
          name="county"
          class="select select-ghost h-auto min-h-0 w-full p-0 text-base-content shadow-none outline-none">
          <option value="">All counties</option>

          {#each counties as countyOption}
            <option value={countyOption}>{countyOption}</option>
          {/each}
        </select>
      </div>

      <div class="w-px self-stretch bg-base-300"></div>

      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="relative" onclick={(event) => event.stopPropagation()}>
        <button
          type="button"
          class="flex w-70 cursor-pointer flex-col px-8 py-4 text-left hover:bg-base-200"
          onclick={() => {
            datesOpen = !datesOpen;
            guestsOpen = false;
          }}>
          <span class="font-semibold">When</span>
          <span class="text-base-content/50">{dateLabel}</span>
        </button>

        {#if datesOpen}
          <div
            class="absolute top-[120%] left-1/2 z-20 w-max -translate-x-1/2"
            onclick={(event) => event.stopPropagation()}>
            <SearchDatePicker bind:checkIn bind:checkOut />
          </div>
        {/if}
      </div>

      <div class="w-px self-stretch bg-base-300"></div>

      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div
        class="relative flex w-70 items-center justify-between rounded-r-full pl-8 cursor-pointer [&:hover:not(:has(button:hover))]:bg-base-200"
        onclick={(event) => event.stopPropagation()}>
        <button
          type="button"
          class="flex flex-col py-4 text-left cursor-pointer"
          onclick={() => {
            guestsOpen = !guestsOpen;
            datesOpen = false;
          }}>
          <span class="font-semibold">Who</span>
          <span class="text-base-content/50">{guestsLabel}</span>
        </button>

        <input
          type="hidden"
          name="checkIn"
          value={checkIn ? checkIn.getTime() : 0}>

        <input
          type="hidden"
          name="checkOut"
          value={checkOut ? checkOut.getTime() : 0}>

        <input type="hidden" name="adults" value={adults}>

        <input type="hidden" name="children" value={children}>

        <input type="hidden" name="infants" value={infants}>

        <button
          type="submit"
          class="btn btn-circle btn-primary mr-2 h-14 min-h-14 w-14 border-0 shadow-none"
          aria-label="Search">
          <Search class="h-5 w-5" />
        </button>

        {#if guestsOpen}
          <div
            class="absolute left-0 top-[120%] z-20 rounded-xl border border-base-300 bg-base-100 p-8 shadow-xl"
            onclick={(event) => event.stopPropagation()}>
            <div class="flex items-center justify-between gap-8">
              <div class="flex w-40 flex-col gap-2">
                <span class="text-lg font-semibold">Adults</span>
                <span class="text-base-content/70">Ages 13 or above</span>
              </div>

              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="btn btn-circle btn-sm"
                  onclick={() => changeGuestCount("adults", -1)}
                  disabled={adults === 0}>
                  <Minus class="h-4 w-4" />
                </button>

                <span class="w-8 text-center text-lg font-semibold">
                  {adults}
                </span>

                <button
                  type="button"
                  class="btn btn-circle btn-sm"
                  onclick={() => changeGuestCount("adults", 1)}>
                  <Plus class="h-4 w-4" />
                </button>
              </div>
            </div>

            <div class="divider"></div>

            <div class="flex items-center justify-between gap-8">
              <div class="flex w-40 flex-col gap-2">
                <span class="text-lg font-semibold">Children</span>
                <span class="text-base-content/70">Ages 2-12</span>
              </div>

              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="btn btn-circle btn-sm"
                  onclick={() => changeGuestCount("children", -1)}
                  disabled={children === 0}>
                  <Minus class="h-4 w-4" />
                </button>

                <span class="w-8 text-center text-lg font-semibold">
                  {children}
                </span>

                <button
                  type="button"
                  class="btn btn-circle btn-sm"
                  onclick={() => changeGuestCount("children", 1)}>
                  <Plus class="h-4 w-4" />
                </button>
              </div>
            </div>

            <div class="divider"></div>

            <div class="flex items-center justify-between gap-8">
              <div class="flex w-40 flex-col gap-2">
                <span class="text-lg font-semibold">Infants</span>
                <span class="text-base-content/70">Under 2</span>
              </div>

              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="btn btn-circle btn-sm"
                  onclick={() => changeGuestCount("infants", -1)}
                  disabled={infants === 0}>
                  <Minus class="h-4 w-4" />
                </button>

                <span class="w-8 text-center text-lg font-semibold">
                  {infants}
                </span>

                <button
                  type="button"
                  class="btn btn-circle btn-sm"
                  onclick={() => changeGuestCount("infants", 1)}>
                  <Plus class="h-4 w-4" />
                </button>
              </div>
            </div>

            <div class="divider"></div>

            <div class="flex items-center justify-between">
              <span class="font-semibold">Total guests</span>
              <span class="text-lg font-bold">{totalGuests}</span>
            </div>
          </div>
        {/if}
      </div>
    </form>

    <NavDropdown {user} />
  {:else}
    <div></div>
    <NavDropdown {user} />
  {/if}
</nav>
