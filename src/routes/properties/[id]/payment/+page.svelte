<script lang="ts">
  import { resolve } from "$app/paths";
  const { data } = $props();

  const property = data.property;
  const checkIn = data.checkIn;
  const checkOut = data.checkOut;
  const nights = data.nights;
  const totalPrice = data.totalPrice;
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

      <form method="post">
        <input type="hidden" name="propertyId" value={property.id} >
        <input type="hidden" name="checkIn" value={checkIn} >
        <input type="hidden" name="checkOut" value={checkOut} >

        <div class="mb-3">
          <label>Card Number</label>
          <input
            name="cardNumber"
            class="form-control"
            placeholder="4242 4242 4242 4242"
            required >
        </div>

        <div class="row">
          <div class="col-md-6">
            <label>Expiry Date</label>
            <input
              name="expiry"
              class="form-control"
              placeholder="MM/YY"
              required >
          </div>

          <div class="col-md-6">
            <label>CVC</label>
            <input name="cvc" class="form-control" placeholder="123" required >
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
