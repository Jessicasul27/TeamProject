<script lang="ts">
  import { ChevronLeft, ChevronRight, Star } from "lucide-svelte";
  import { SvelteDate } from "svelte/reactivity";
  import { enhance } from "$app/forms";
  
   let showReviewModel = $state(false);
  let rating = $state(5);
  let comment = $state("");

  type BookingDay = {
    day: number;
    date: Date;
    available: boolean;
  };

  function utcDay(date: Date) {
    return Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
    );
  }

  const MS_PER_DAY = 86_400_000;
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

        const dayDate = new Date(Date.UTC(year, month, day));

        days.push({
          day,
          date: dayDate,
          available: isDateAvailable(dayDate),
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

    return Math.round((utcCheckOut - utcCheckIn) / MS_PER_DAY);
  });

  const galleryImages = $derived.by(() => {
    const images = property.images.slice(0, 4);

    while (images.length < 4) {
      images.push({
        id: "",
        imageUrl: `https://loremflickr.com/800/600/house,apartment,hotel?random=${~~(Math.random() * 100000)}`,
        property: null!,
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

  function isDateAvailable(date: Date) {
    const day = utcDay(date);
    const today = utcDay(new Date());

    function isDateUnbooked(day: number) {
      return (
        day > today &&
        property.bookings.every(({ checkInDate, checkOutDate }) => {
          return day < utcDay(checkInDate) || day >= utcDay(checkOutDate);
        })
      );
    }

    function canStartBookingOn(day: number) {
      return isDateUnbooked(day) && isDateUnbooked(day + MS_PER_DAY);
    }

    if (!checkIn || checkOut) {
      return canStartBookingOn(day);
    }

    const checkInDay = utcDay(checkIn);

    if (day <= checkInDay) {
      return false;
    }

    // every day from checkIn + 1 up to selected date must be unbooked
    for (let d = checkInDay + MS_PER_DAY; d <= day; d += MS_PER_DAY) {
      if (!isDateUnbooked(d)) {
        return false;
      }
    }

    return true;
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

  <div class="grid grid-cols-4 grid-rows-2 gap-2 aspect-2/1">
    <img
      class="h-full w-full row-span-2 col-span-2 rounded-2xl object-center object-cover"
      src={property.displayImage}
      alt={property.title}>

    {#each galleryImages as image}
      <img
        class="h-full w-full rounded-2xl object-cover object-center"
        src={image.imageUrl}
        alt={property.title}>
    {/each}
  </div>

  <div class="flex-1 flex justify-between mt-8">
    <div class="flex-1 flex flex-col">
      <p class="text-2xl font-semibold">
        {property.type}
        in {property.location}
      </p>
      <p class="mb-10">{property.description}</p>
      <span class="text-2xl font-semibold">
        {property.reviews.length === 0 ? "No" : property.reviews.length}
        Reviews
      </span>
      <div class="grid grid-cols-2 gap-8 gap-x-12 mt-6 pr-8">
        {#each property.reviews.slice(0, 10) as review}
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-4">
              <img
                class="w-14 h-14 rounded-full"
                src={review.user.image}
                alt={review.user.name}>
              <div class="flex flex-col justify-center mb-1">
                <span class="font-semibold">{review.user.name}</span>
                <div class="flex items-center gap-0.5">
                  {#each Array.from({ length: review.rating }) as _}
                    <Star class="w-3 h-3 fill-base-content" />
                  {/each}
                </div>
              </div>
            </div>
            <p class="text-sm">{review.comment}</p>
          </div>
        {/each}
      </div>
    </div>
    <div
      class="flex flex-col gap-8 border border-base-300 rounded-2xl bg-base-200/50 select-none py-4 px-6 h-fit w-fit shadow-xl">
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
                  bookingDay.available ? "cursor-pointer hover:border" : "text-base-content/30 border-base-content/50"
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

      <form method="POST" action="?/pay" class="contents">
        <input
          type="hidden"
          name="checkIn"
          value={checkIn ? checkIn.getTime() : 0}>

        <input
          type="hidden"
          name="checkOut"
          value={checkOut ? checkOut.getTime() : 0}>

        <button
          type="submit"
          class="btn btn-success w-full"
          disabled={!checkIn || !checkOut}>
          Book now
        </button>
      </form>
    </div>
  </div>
  <div class="flex flex-col items-center gap-4 mt-20">
    <h1 class="text-2xl font-bold">Would you like to leave a review?</h1>
    <p class="text-center text-gray-600 mb-10">
      Sharing your experience helps other travelers make informed decisions and helps
      us improve our services. If you've stayed at this property, we'd love to hear
      your feedback!
    </p>
   <button
       onclick={() => (showReviewModel = true, console.log("Opening review model"))}
      class="btn btn-primary w-fit">
      Leave a review
      
  </button>
  {#if showReviewModel == true}
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-base-100 rounded-xl p-6 w-87.5px shadow-xl relative">

      <button
        class="absolute top-2 right-2 text-lg"
        onclick={() => (showReviewModel = false)}
      >
        ✕
      </button>
      <form method="POST" action="?/review" use:enhance class="flex flex-col gap-4">
        <fieldset class="flex flex-col gap-2">
          <legend class="font-semibold text-lg">Review</legend>
          <input type="hidden" name="propertyId" value={property.id} />
          <label class="text-sm">Comment</label>
          <textarea
              class="textarea textarea-bordered"
              name="comment"
              bind:value={comment}
              placeholder="Your review"
              required
          ></textarea>

          <label class="text-sm">Rating</label>
          <div class="flex items-center gap-2">
            {#each [1,2,3,4,5] as star}
              <button
                type="button"
                onclick={() => (rating = star)}
                class="text-xl"
              >
                <Star
                  class={star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                />
              </button>
            {/each}
            <span class="ml-2 font-semibold">{rating} / 5</span>
          </div>

          <input type="hidden" name="rating" value={rating} />

          <button class="btn btn-neutral mt-2" type="submit">
            Submit Review
          </button>
        </fieldset>

      </form>
    </div>
  </div>
{/if}
  </div>  
</div>
