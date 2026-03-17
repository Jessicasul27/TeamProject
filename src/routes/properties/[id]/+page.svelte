<script lang="ts">
  import { ChevronLeft, ChevronRight } from "lucide-svelte";
  import { SvelteDate } from "svelte/reactivity";

  type BookingDay = {
    day: number;
    date: Date;
    available: boolean;
  };

  const DAYS_OF_THE_WEEK = ["M", "T", "W", "T", "F", "S", "S"];

  const { data, form } = $props();
  const user = $derived(data.user);
  const property = $derived(data.property);

  let currentDate = $state(new SvelteDate());
  let checkIn: SvelteDate | undefined = $state();
  let checkOut: SvelteDate | undefined = $state();

  const weeks = $derived.by(() => {
    const year = currentDate.getUTCFullYear();
    const month = currentDate.getUTCMonth();

    // create date for first day of the month
    const date = new Date(Date.UTC(year, month));

    // sunday is index 0, normalize (using modulo) to monday being at index 0
    const dayOfTheWeek = (date.getUTCDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getUTCDate();

    let day = 0;
    const weeks: (BookingDay | null)[][] = [];

    for (let week = 0; week < 6; week++) {
      const days: (BookingDay | null)[] = [];

      if (week === 0) {
        // first week should have empty cells at the start
        for (let i = 0; i < dayOfTheWeek; i++) {
          days.push(null);
        }
      }

      // normal days until no more days in the month
      while (days.length < 7 && day < daysInMonth) {
        day += 1;

        const dayDate = new Date(year, month, day);

        days.push({
          day,
          date: dayDate,
          available:
            dayDate.getTime() < Date.now()
              ? false
              : Boolean(Math.round(Math.random())),
        });
      }

      // fill the rest of cells with null
      while (days.length < 7) {
        days.push(null);
      }

      weeks.push(days);
    }

    return weeks;
  });

  const hasPrevMonth = $derived.by(() => {
    const now = new Date();
    return (
      now.getUTCMonth() === currentDate.getUTCMonth() &&
      now.getUTCFullYear() === currentDate.getUTCFullYear()
    );
  });

  const nights = $derived.by(() => {
    if (!checkIn || !checkOut) {
      return 0;
    }

    const utcCheckIn = Date.UTC(
      checkIn.getFullYear(),
      checkIn.getMonth(),
      checkIn.getDate(),
    );

    const utcCheckOut = Date.UTC(
      checkOut.getFullYear(),
      checkOut.getMonth(),
      checkOut.getDate(),
    );

    return Math.round((utcCheckOut - utcCheckIn) / 86_400_000);
  });

  const galleryImages = $derived.by(() => {
    const images = property.images.slice(0, 4);

    while (images.length < 4) {
      images.push({
        id: "",
        imageUrl: `https://loremflickr.com/800/600/house,apartment,hotel?random=${~~(Math.random() * 100000)}`,
        property,
        propertyId: property.id,
      });
    }

    return images;
  });

  function prevMonth() {
    currentDate.setUTCMonth(currentDate.getUTCMonth() - 1);
  }

  function nextMonth() {
    currentDate.setUTCMonth(currentDate.getUTCMonth() + 1);
  }

  function onDayClick(day: BookingDay) {
    const date = new SvelteDate(day.date);

    if (checkIn === undefined) {
      checkIn = date;
    } else if (checkOut === undefined) {
      if (date > checkIn) {
        checkOut = date;
      } else {
        checkIn = date;
      }
    } else {
      checkIn = date;
      checkOut = undefined;
    }
  }

  function isDayIncluded(day: BookingDay | null) {
    if (!checkIn || !checkOut || !day) {
      return false;
    }

    return day.date >= checkIn && day.date <= checkOut;
  }
</script>

<div class="flex-1 flex flex-col py-20 mx-40">
  <div class="flex items-center justify-between mb-4">
    <span class="font-bold text-4xl text-primary">{property.title}</span>
    <span class="font-bold text-3xl text-primary/80">
      &euro;{property.pricePerNight}
      per night
    </span>
  </div>

  <div class="grid grid-cols-2 gap-2">
    <img
      class="rounded-2xl h-120 object-center object-cover"
      src={property.displayImage}
      alt={property.title} >
    <div class="grid grid-cols-2 grid-rows-2 gap-2 items-stretch">
      {#each galleryImages as image}
        <img
          class="rounded-2xl object-cover object-center"
          src={image.imageUrl}
          alt={property.title} >
      {/each}
    </div>
  </div>

  <div class="flex-1 flex justify-between mt-8">
    <div class="flex flex-col ">
      <p class="text-2xl font-semibold">
        {property.type}
        in {property.location}
      </p>
      <p>{property.description}</p>
    </div>
    <div
      class="flex flex-col gap-8 border border-base-300 rounded-2xl bg-base-200/50 select-none py-4 px-6 w-fit shadow-xl">
      <div class="flex flex-col gap-1">
        {#if !checkIn || !checkOut}
          <span class="text-2xl font-semibold">Select dates</span>
          <span class="text-base-content/80 text-sm">
            Minimum stay: 1 night
          </span>
        {:else}
          <div class="flex items-center justify-between text-2xl font-semibold">
            <span>{nights} {`night${nights !== 1 ? "s": ""}`}</span>
            <span>&euro;{nights * property.pricePerNight}</span>
          </div>
          <span class="text-base-content/80 text-sm">
            {checkIn.toLocaleString("default", { year: "numeric", month: "long", day: "2-digit" })}
            -
            {checkOut.toLocaleString("default", { year: "numeric", month: "long", day: "2-digit" })}
          </span>
        {/if}
      </div>

      <div class="grid grid-cols-[1fr_auto_1fr] justify-between w-full">
        <button
          onclick={prevMonth}
          disabled={hasPrevMonth}
          type="button"
          class="rounded-full justify-self-start aspect-square flex items-center justify-center 
             not-disabled:cursor-pointer not-disabled:hover:bg-base-300
             disabled:text-base-content/50">
          <ChevronLeft />
        </button>
        <span class="font-bold text-lg">
          {currentDate.toLocaleString("default", { month: "long" })}
          {currentDate.getFullYear()}
        </span>
        <button
          onclick={nextMonth}
          type="button"
          class="cursor-pointer rounded-full hover:bg-base-300 justify-self-end aspect-square flex items-center justify-center">
          <ChevronRight class="rounded-full hover:bg-base-300" />
        </button>
      </div>
      <div class="grid grid-cols-7 text-sm gap-y-0.5">
        {#each DAYS_OF_THE_WEEK as weekday}
          <div class="flex items-center justify-center w-10 h-10">
            <div class="font-bold text-base-content/80">{weekday}</div>
          </div>
        {/each}
        {#each weeks as week}
          {#each week as bookingDay}
            <div
              class={`flex items-center justify-center w-10 h-10 
              ${
                bookingDay === null ? "" : 
                bookingDay.available ? "text-base-content border-base-content" : "text-base-content/50 border-base-content/50"
              } 
              ${
                isDayIncluded(bookingDay) ? "bg-black/5 rounded-none" : ""
              }
              ${
                bookingDay && checkOut && (checkIn && checkIn.getTime() === bookingDay.date.getTime()) ? "rounded-l-full" : "rounded-full"
              }
              ${
                bookingDay && checkIn && (checkOut && checkOut.getTime() === bookingDay.date.getTime()) ? "rounded-r-full" : "rounded-full"
              }`}>
              <button
                type="button"
                class={`w-[95%] h-[95%] rounded-full ${
                  bookingDay === null ? "" : 
                  bookingDay.available ? "cursor-pointer hover:border" : "text-base-content/50 border-base-content/50"
                }`}
                class:bg-black={bookingDay 
                && ((checkIn && checkIn.getTime() === bookingDay.date.getTime()) 
                  || (checkOut && checkOut.getTime() === bookingDay.date.getTime())
                )}
                class:text-white={bookingDay 
                && ((checkIn && checkIn.getTime() === bookingDay.date.getTime()) 
                  || (checkOut && checkOut.getTime() === bookingDay.date.getTime())
                )}
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
      <div>
        <form class="contents">
          <button type="submit" class="btn btn-success w-full">Book now</button>
        </form>
      </div>
    </div>
  </div>
</div>
