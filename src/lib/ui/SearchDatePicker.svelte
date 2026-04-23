<script lang="ts">
  import { ChevronLeft, ChevronRight } from "lucide-svelte";

  const DAYS_OF_THE_WEEK = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  type CalendarDay = {
    date: Date;
    day: number;
    available: boolean;
  };

  let {
    checkIn = $bindable(),
    checkOut = $bindable(),
  }: {
    checkIn: Date | null;
    checkOut: Date | null;
  } = $props();

  function startOfDay(date: Date) {
    const nextDate = new Date(date);
    nextDate.setHours(0, 0, 0, 0);

    return nextDate;
  }

  function sameDay(a: Date | null, b: Date | null) {
    return !!a && !!b && a.getTime() === b.getTime();
  }

  const today = startOfDay(new Date());

  let currentDate = $state(new Date(today.getFullYear(), today.getMonth(), 1));

  let hasPrevMonth = $derived(
    currentDate.getFullYear() === today.getFullYear() &&
      currentDate.getMonth() === today.getMonth(),
  );

  let weeks = $derived.by(() => {
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    );

    const days: (CalendarDay | null)[] = [];

    const emptyDaysBefore = (firstDayOfMonth.getDay() + 6) % 7;

    for (let i = 0; i < emptyDaysBefore; i++) {
      days.push(null);
    }

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const date = startOfDay(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
      );

      days.push({
        date,
        day,
        available: date.getTime() >= today.getTime(),
      });
    }

    while (days.length % 7 !== 0) {
      days.push(null);
    }

    const nextWeeks: (CalendarDay | null)[][] = [];

    for (let i = 0; i < days.length; i += 7) {
      nextWeeks.push(days.slice(i, i + 7));
    }

    return nextWeeks;
  });

  function prevMonth() {
    if (hasPrevMonth) {
      return;
    }

    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    );
  }

  function nextMonth() {
    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1,
    );
  }

  function onDayClick(bookingDay: CalendarDay) {
    const clickedDate = bookingDay.date;

    if (!checkIn || (checkIn && checkOut)) {
      checkIn = clickedDate;
      checkOut = null;
      return;
    }

    if (clickedDate.getTime() <= checkIn.getTime()) {
      checkIn = clickedDate;
      checkOut = null;
      return;
    }

    checkOut = clickedDate;
  }

  function isDayIncluded(bookingDay: CalendarDay | null) {
    if (!checkIn || !checkOut || !bookingDay) {
      return false;
    }

    return bookingDay.date >= checkIn && bookingDay.date <= checkOut;
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="flex flex-col gap-8 border border-base-300 rounded-2xl bg-base-100 select-none py-4 px-6 h-fit w-fit shadow-xl text-base"
  onclick={(event) => event.stopPropagation()}>
  <div class="grid grid-cols-[1fr_auto_1fr] justify-between">
    <button
      onclick={prevMonth}
      disabled={hasPrevMonth}
      type="button"
      class="flex aspect-square items-center justify-center rounded-full justify-self-start not-disabled:cursor-pointer not-disabled:hover:bg-base-300 disabled:text-base-content/50">
      <ChevronLeft />
    </button>

    <span class="font-bold text-lg">
      {currentDate.toLocaleString("default", { month: "long" })}
      {currentDate.getFullYear()}
    </span>

    <button
      onclick={nextMonth}
      type="button"
      class="flex aspect-square cursor-pointer items-center justify-center rounded-full justify-self-end hover:bg-base-300">
      <ChevronRight />
    </button>
  </div>

  <div class="mt-6 grid grid-cols-7 gap-y-0.5 text-sm">
    {#each DAYS_OF_THE_WEEK as weekday}
      <div class="flex h-10 w-10 items-center justify-center">
        <div class="font-bold text-base-content/80">{weekday}</div>
      </div>
    {/each}

    {#each weeks as week}
      {#each week as bookingDay}
        <div
          class={`flex h-10 w-10 items-center justify-center 
          ${
            isDayIncluded(bookingDay) ? "bg-black/5 rounded-none" : ""
          }
          ${
            bookingDay
            && checkOut
            && sameDay(checkIn, bookingDay.date)
              ? "rounded-l-full"
              : "rounded-full"
          }
          ${
            bookingDay
            && checkIn
            && sameDay(checkOut, bookingDay.date)
              ? "rounded-r-full"
              : "rounded-full"
          }`}>
          <button
            type="button"
            class={`h-[95%] w-[95%] rounded-full ${
              bookingDay === null
                ? ""
                : bookingDay.available
                  ? "cursor-pointer hover:border"
                  : "cursor-not-allowed text-base-content/30"
            }`}
            class:bg-black={bookingDay
              && (sameDay(checkIn, bookingDay.date)
                || sameDay(checkOut, bookingDay.date))}
            class:text-white={bookingDay
              && (sameDay(checkIn, bookingDay.date)
                || sameDay(checkOut, bookingDay.date))}
            onclick={() => {
              if (bookingDay !== null && bookingDay.available) {
                onDayClick(bookingDay);
              }
            }}>
            {#if bookingDay !== null}
              <span class="font-bold">{bookingDay.day}</span>
            {:else}
              <span></span>
            {/if}
          </button>
        </div>
      {/each}
    {/each}
  </div>
</div>
