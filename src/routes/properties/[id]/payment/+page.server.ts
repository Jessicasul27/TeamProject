import { db } from "$lib/server/db";
import { redirect, error } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { validateCard } from "$lib/validation/schema";

function calculateBooking(
  checkIn: string | null,
  checkOut: string | null,
  pricePerNight: number,
) {
  let nights = 0;
  let totalPrice = 0;

  if (checkIn && checkOut) {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    const msPerDay = 1000 * 60 * 60 * 24;

    nights = Math.floor(diffTime / msPerDay);

    if (nights > 0) {
      totalPrice = nights * pricePerNight;
    }
  }

  return { nights, totalPrice };
}

function paymentRedirect(
  propertyId: string,
  checkIn: string,
  checkOut: string,
) {
  return `/properties/${propertyId}/payment?checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}&error=invalid`;
}

export const load: PageServerLoad = async ({ params, url }) => {
  const property = await db.propertyRepo.findOneOrFail({
    where: { id: params.id },
    relations: {
      images: true,
      landlord: true,
    },
  });

  const checkIn = url.searchParams.get("checkIn");
  const checkOut = url.searchParams.get("checkOut");
  const paymentError = url.searchParams.get("error");

  const { nights, totalPrice } = calculateBooking(
    checkIn,
    checkOut,
    property.pricePerNight,
  );

  return {
    property: structuredClone(property),
    checkIn,
    checkOut,
    nights,
    totalPrice,
    paymentError:
      paymentError === "invalid"
        ? "Invalid card details. Please check your card number, expiry date, and CVC."
        : null,
  };
};

export const actions: Actions = {
  validation: async ({ request, params }) => {
    const form = await request.formData();

    const cardNumber = form.get("cardNumber")?.toString() ?? "";
    const expiry = form.get("expiry")?.toString() ?? "";
    const cvc = form.get("cvc")?.toString() ?? "";

    const checkIn = form.get("checkIn")?.toString() ?? "";
    const checkOut = form.get("checkOut")?.toString() ?? "";

    const validation = validateCard({
      cardNumber,
      expiry,
      cvc,
    });

    if (!validation.cardNumber || !validation.expiry || !validation.cvc) {
      throw redirect(303, paymentRedirect(params.id, checkIn, checkOut));
    }

    const property = await db.propertyRepo.findOneOrFail({
      where: { id: params.id },
    });

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      throw redirect(303, paymentRedirect(params.id, checkIn, checkOut));
    }

    const msPerDay = 1000 * 60 * 60 * 24;
    const nights = Math.floor(
      (checkOutDate.getTime() - checkInDate.getTime()) / msPerDay,
    );

    const bookingPrice = nights * property.pricePerNight;

    await db.bookingRepo.save({
      checkInDate,
      checkOutDate,
      // customerUserId: userId,
      customerUserId: "66176b0f-3e12-4450-97aa-e56a276ed96d",
      propertyId: params.id,
      bookingPrice,
    });

    throw redirect(303, "/?paid=true");
  },

  prepare: async ({ request, params }) => {
    const form = await request.formData();
    const checkIn = form.get("checkIn");
    const checkOut = form.get("checkOut");

    if (!params.id || !checkIn || !checkOut) {
      throw new Error("Missing booking data");
    }

    const checkInValue = checkIn.toString();
    const checkOutValue = checkOut.toString();

    const checkInDate = new Date(checkInValue);
    const checkOutDate = new Date(checkOutValue);

    if (checkOutDate <= checkInDate) {
      throw error(400, "Invalid date range");
    }

    throw redirect(
      303,
      `/properties/${params.id}/payment?checkIn=${encodeURIComponent(checkInValue)}&checkOut=${encodeURIComponent(checkOutValue)}`,
    );
  },
};
