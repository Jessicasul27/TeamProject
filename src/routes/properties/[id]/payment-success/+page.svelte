<script lang="ts">
  let { data } = $props();
</script>

<div class="mx-auto max-w-2xl p-6">
  <div class="card bg-base-100 shadow">
    <div class="card-body">
      <h1 class="card-title text-success">Payment successful</h1>

      <p>Your booking has been created.</p>

      <div class="mt-4 space-y-2">
        <p>
          <strong>Booking reference:</strong>
          {data.bookingReference}
        </p>

        <p>
          <strong>Payment status:</strong>
          {data.paymentStatus}
        </p>

        <p><strong>Total:</strong>€{data.totalPrice}</p>
      </div>

      <div class="card-actions mt-4">
        <a class="btn btn-primary" href="/user/profile">View my bookings</a>
        <a class="btn" href="/">Return home</a>
      </div>
    </div>
  </div>
</div>
