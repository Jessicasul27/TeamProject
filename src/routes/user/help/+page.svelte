<script lang="ts">
  let activeCategory = $state("general");
</script>

<div class="flex-1">
  <div class="px-6 pb-10">
    <div class="mb-4 flex items-center gap-2">
      <h1 class="text-2xl font-semibold">Help Centre</h1>
    </div>

    <div class="mb-4 text-center">
      <h2 class="text-5xl font-semibold">Hi, how can we help?</h2>
    </div>

    <div class="mb-6 flex justify-center">
      <div class="w-175">
        <div class="flex gap-8 border-b border-base-300">
          <button
            type="button"
            class={activeCategory === "general"
							? "border-b-2 border-black pb-3 text-lg font-semibold"
							: "pb-3 text-lg text-gray-500"}
            onclick={() => (activeCategory = "general")}>
            General
          </button>

          <button
            type="button"
            class={activeCategory === "account"
							? "border-b-2 border-black pb-3 text-lg font-semibold"
							: "pb-3 text-lg text-gray-500"}
            onclick={() => (activeCategory = "account")}>
            Account
          </button>

          <button
            type="button"
            class={activeCategory === "booking"
							? "border-b-2 border-black pb-3 text-lg font-semibold"
							: "pb-3 text-lg text-gray-500"}
            onclick={() => (activeCategory = "booking")}>
            Booking
          </button>

          <button
            type="button"
            class={activeCategory === "payments"
							? "border-b-2 border-black pb-3 text-lg font-semibold"
							: "pb-3 text-lg text-gray-500"}
            onclick={() => (activeCategory = "payments")}>
            Payments
          </button>
        </div>
      </div>
    </div>

    <div class="flex justify-center">
      <div class="w-175 space-y-4">
        {#if activeCategory === "general"}
          <h3 class="text-3xl font-semibold">General</h3>

          <details class="collapse border border-base-300 bg-base-100">
            <summary class="collapse-title font-semibold">
              What is StayCraft?
            </summary>
            <div class="collapse-content text-sm">
              StayCraft is a website where users can browse and book places to
              stay.
            </div>
          </details>

          <details class="collapse border border-base-300 bg-base-100">
            <summary class="collapse-title font-semibold">
              Is the website free to use?
            </summary>
            <div class="collapse-content text-sm">
              Yes, browsing listings is free. You only pay when you make a
              booking.
            </div>
          </details>
        {/if}

        {#if activeCategory === "account"}
          <h3 class="text-3xl font-semibold">Account</h3>

          <details class="collapse border border-base-300 bg-base-100">
            <summary class="collapse-title font-semibold">
              How do I create an account?
            </summary>
            <div class="collapse-content text-sm">
              Click the sign up button and fill in your details to create an
              account.
            </div>
          </details>

          <details class="collapse border border-base-300 bg-base-100">
            <summary class="collapse-title font-semibold">
              How do I reset my password?
            </summary>
            <div class="collapse-content text-sm">
              Click forgot password on the login page and follow the
              instructions sent to your email.
            </div>
          </details>
        {/if}

        {#if activeCategory === "booking"}
          <h3 class="text-3xl font-semibold">Booking</h3>

          <details class="collapse border border-base-300 bg-base-100">
            <summary class="collapse-title font-semibold">
              How do I book a stay?
            </summary>
            <div class="collapse-content text-sm">
              Choose a property, select your dates, and complete the booking
              process.
            </div>
          </details>

          <details class="collapse border border-base-300 bg-base-100">
            <summary class="collapse-title font-semibold">
              Can I cancel a booking?
            </summary>
            <div class="collapse-content text-sm">
              Yes, cancellations depend on the host's cancellation policy.
            </div>
          </details>
        {/if}

        {#if activeCategory === "payments"}
          <h3 class="text-3xl font-semibold">Payments</h3>

          <details class="collapse border border-base-300 bg-base-100">
            <summary class="collapse-title font-semibold">
              What payment methods are accepted?
            </summary>
            <div class="collapse-content text-sm">
              We accept most major debit and credit cards.
            </div>
          </details>

          <details class="collapse border border-base-300 bg-base-100">
            <summary class="collapse-title font-semibold">
              When will I be charged?
            </summary>
            <div class="collapse-content text-sm">
              You will usually be charged when the booking is confirmed.
            </div>
          </details>
        {/if}
      </div>
    </div>
  </div>
</div>
