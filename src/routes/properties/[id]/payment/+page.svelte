<script lang="ts">
  import { resolve } from "$app/paths";
  import { onMount } from "svelte";

  const { data, form } = $props();

  const property = data.property;
  const checkIn = form?.checkIn ?? data.checkIn;
  const checkOut = form?.checkOut ?? data.checkOut;
  const nights = form?.nights ?? data.nights;
  const totalPrice = form?.totalPrice ?? data.totalPrice;
  const paymentError = form?.paymentError ?? null;

  onMount(() => {
    if (paymentError) {
      alert(paymentError);
    }
  });

  function formatCard(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, "");
    value = value.slice(0, 16);
    value = value.replace(/(.{4})/g, "$1 ").trim();
    input.value = value;
  }

  function formatExpiry(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, "");
    value = value.slice(0, 4);

    if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }

    input.value = value;
  }

  function formatCvc(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, "").slice(0, 4);
  }
</script>

<div class="container mt-4">
  <div class="card">
    <div class="card-header">
      <h2>Confirm Booking</h2>
    </div>

    <div class="card-body">
      <div class="p-3 border rounded bg-light mb-4">
        <h4>{property.title}</h4>

        <p><strong>Check In:</strong> {checkIn}</p>
        <p><strong>Check Out:</strong> {checkOut}</p>
        <p><strong>Nights:</strong> {nights}</p>

        <hr >

        <p>€{property.pricePerNight} × {nights} nights</p>
        <h4 class="text-success">Total Price: €{totalPrice}</h4>
      </div>

      <form method="post" action="?/validation">
        <input type="hidden" name="checkIn" value={checkIn} >
        <input type="hidden" name="checkOut" value={checkOut} >

        <div class="mb-3">
          <label>Card Number</label>
          <input
            name="cardNumber"
            class="form-control"
            placeholder="4242 4242 4242 4242"
            maxlength="19"
            inputmode="numeric"
            value={form?.cardNumber ?? ""}
            oninput={formatCard}
            required >
        </div>

        <div class="row">
          <div class="col-md-6">
            <label>Expiry Date</label>
            <input
              name="expiry"
              class="form-control"
              placeholder="MM/YY"
              maxlength="5"
              inputmode="numeric"
              value={form?.expiry ?? ""}
              oninput={formatExpiry}
              required >
          </div>

          <div class="col-md-6">
            <label>CVC</label>
            <input
              name="cvc"
              class="form-control"
              placeholder="123"
              maxlength="4"
              inputmode="numeric"
              value={form?.cvc ?? ""}
              oninput={formatCvc}
              required >
          </div>
        </div>

        <div class="col-md-6">
          <button type="submit" class="btn btn-primary mt-4 w-100">Pay</button>
        </div>
      </form>

      <div class="card-footer mt-4">
        <div class="row">
          <div class="col-md-6">
            <a href={resolve("/")} class="btn btn-success w-100">
              Back to List
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
