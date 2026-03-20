<script lang="ts">
  let activeCategory = $state("general");
</script>

<div class="flex-1 self-stretch pt-2">
  <div class="px-6 pb-10">
    <div class="mb-4 flex items-center gap-2">
      <h1 class="text-2xl font-semibold">Help Centre</h1>
    </div>

    <div class="mb-4 text-center">
      <h2 class="text-5xl font-semibold">Hi, how can we help?</h2>
    </div>

    <div class="mb-6 flex justify-center">
      <div class="w-175">
        <div class="flex gap-8 border-b border-base-300 pt-2">
          <button
            type="button"
            class={activeCategory === "general"
							? "cursor-pointer border-b-2 border-black pb-3 text-lg font-semibold"
							: "pb-3 text-lg text-gray-500 hover:text-black"}
            onclick={() => (activeCategory = "general")}>
            General
          </button>

          <button
            type="button"
            class={activeCategory === "account"
							? "cursor-pointer border-b-2 border-black pb-3 text-lg font-semibold"
							: "pb-3 text-lg text-gray-500 hover:text-black"}
            onclick={() => (activeCategory = "account")}>
            Account
          </button>

          <button
            type="button"
            class={activeCategory === "booking"
							? "cursor-pointer border-b-2 border-black pb-3 text-lg font-semibold"
							: "pb-3 text-lg text-gray-500 hover:text-black"}
            onclick={() => (activeCategory = "booking")}>
            Booking
          </button>

          <button
            type="button"
            class={activeCategory === "payments"
							? "cursor-pointer border-b-2 border-black pb-3 text-lg font-semibold"
							: "pb-3 text-lg text-gray-500 hover:text-black"}
            onclick={() => (activeCategory = "payments")}>
            Payments
          </button>

          <button
            type="button"
            class={activeCategory === "hosting"
              ? "cursor-pointer border-b-2 border-black pb-3 text-lg font-semibold"
              : "cursor-pointer pb-3 text-lg text-gray-500 hover:text-black"}
            onclick={() => (activeCategory = "hosting")}>
            Hosting
          </button>

          <button
            type="button"
            class={activeCategory === "safety"
              ? "cursor-pointer border-b-2 border-black pb-3 text-lg font-semibold"
              : "cursor-pointer pb-3 text-lg text-gray-500 hover:text-black"}
            onclick={() => (activeCategory = "safety")}>
            Safety
          </button>
        </div>
      </div>
    </div>

    <div class="flex justify-center">
      <div class="w-175 space-y-4">
        {#if activeCategory === "general"}
          <h3 class="text-3xl font-semibold">General</h3>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>What is StayCraft?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              StayCraft is a website where users can browse and book places to
              stay.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>Is the website free to use?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Yes, browsing listings is free. You only pay when you make a
              booking.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>Can I browse listings without logging in?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Yes, guests can browse most listings before creating an account.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>Is StayCraft available on mobile?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Yes, the website is designed to work on phones, tablets, and
              desktops.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>Can I save properties for later?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Yes, you can save properties to your favourites list to view
              later.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>How often are listings updated?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Listings are updated regularly by hosts when they change prices,
              availability, or details.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>Can I contact a host before booking?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Yes, guests can usually send a message to the host before
              confirming a booking.
            </div>
          </details>
        {/if}

        {#if activeCategory === "account"}
          <h3 class="text-3xl font-semibold">Account</h3>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>How do I create an account?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Click the sign up button and fill in your details to create an
              account.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>How do I reset my password?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Click forgot password on the login page and follow the
              instructions sent to your email.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>How do I change my email address?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              You can update your email address in the account settings section.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>Can I upload a profile picture?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Yes, profile pictures can be uploaded from your account profile
              page.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>How do I delete my account?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Account deletion can be requested from the settings or support
              page.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>Can I have both guest and host accounts?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Yes, one account can be used for both booking stays and hosting
              properties.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>Why am I not receiving verification emails?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Check your spam folder and make sure the email address entered is
              correct.
            </div>
          </details>
        {/if}

        {#if activeCategory === "booking"}
          <h3 class="text-3xl font-semibold">Booking</h3>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>How do I book a stay?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Choose a property, select your dates, and complete the booking
              process.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>Can I cancel a booking?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Yes, cancellations depend on the host's cancellation policy.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>Can I change my booking dates?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              In some cases, booking dates can be changed by contacting the host
              or support team.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>How do I know if my booking is confirmed?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              You will receive a confirmation message and email once your
              booking is accepted.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>Can I book for someone else?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Yes, but the booking details should match the person who will be
              staying.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>What happens if a host cancels my booking?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              You may be notified immediately and offered support to find
              another place to stay.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>Can I book long-term stays?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Yes, some listings support weekly or monthly stays depending on
              the host.
            </div>
          </details>
        {/if}

        {#if activeCategory === "payments"}
          <h3 class="text-3xl font-semibold">Payments</h3>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>What payment methods are accepted?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              We accept most major debit and credit cards.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>When will I be charged?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              You will usually be charged when the booking is confirmed.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>Can I pay in instalments?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Some bookings may support split or scheduled payments depending on
              the reservation.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>Do you charge any service fees?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              A small service fee may be added during checkout depending on the
              booking.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>Can I get a refund?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Refunds depend on the cancellation policy and the stage of the
              booking.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>Is my payment information secure?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Payment details are handled through secure systems to help protect
              user information.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>Can I use a discount code?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Yes, discount codes can usually be entered during the checkout
              process.
            </div>
          </details>
        {/if}

        {#if activeCategory === "hosting"}
          <h3 class="text-3xl font-semibold">Hosting</h3>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>How do I become a host?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              You can become a host by creating a listing and filling in your
              property details.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>How do I add photos to my listing?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Photos can be uploaded from the host dashboard while editing your
              property listing.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>Can I set my own nightly price?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Yes, hosts can choose their own nightly rates and update them
              whenever needed.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>How do I block unavailable dates?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Unavailable dates can be blocked from your host calendar.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>How do I message guests?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Hosts can message guests directly through the inbox section of the
              site.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>When do hosts receive payouts?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Payouts are usually processed shortly after a guest checks in.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>Can I pause my listing temporarily?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Yes, hosts can temporarily hide or pause listings from appearing
              in search results.
            </div>
          </details>
        {/if}

        {#if activeCategory === "safety"}
          <h3 class="text-3xl font-semibold">Safety</h3>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>How do I report suspicious activity?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Suspicious activity can be reported through the support or
              reporting section of the platform.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>Are hosts verified?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Some hosts may go through identity or profile verification before
              publishing listings.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>What should I do in an emergency during a stay?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Contact local emergency services first, then inform the host and
              support team.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>Can I block another user?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Yes, users may be able to block or mute others to limit contact.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>How is my personal information protected?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Personal information is stored using secure systems and access
              controls.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>Can I report a listing?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Yes, listings can be reported if they seem misleading, unsafe, or
              inappropriate.
            </div>
          </details>

          <details class="group border border-base-300 bg-base-100">
            <summary
              class="flex cursor-pointer items-center justify-between px-4 py-4 font-semibold list-none">
              <span>What happens after I submit a safety report?</span>
              <span class="text-lg">
                <span class="group-open:hidden">⌄</span>
                <span class="hidden group-open:inline">^</span>
              </span>
            </summary>
            <div class="px-4 pb-4 text-sm">
              Reports are reviewed by the support team and may lead to account
              or listing checks.
            </div>
          </details>
        {/if}
      </div>
    </div>
  </div>
</div>
