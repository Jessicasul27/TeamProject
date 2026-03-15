import { db } from "$lib/server/db";
import { redirect, fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { validateCard } from "./schema";

async function requireCustomer(user: App.Locals["user"]) {
  if (!user) {
    throw redirect(303, "/auth/login");
  }

  const customer = await db.customerRepo.findOne({
    where: { userId: user.id },
  });

  if (!customer) {
    throw redirect(303, "/auth/login");
  }

  return user;
}

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

export const load: PageServerLoad = async ({ params, url, locals }) => {
  await requireCustomer(locals.user);

  const property = await db.propertyRepo.findOneOrFail({
    where: { id: params.id },
    relations: {
      images: true,
      landlord: true,
    },
  });

  const checkIn = url.searchParams.get("checkIn");
  const checkOut = url.searchParams.get("checkOut");

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
  };
};

export const actions: Actions = {
  validation: async ({ request, params, locals }) => {
    const user = await requireCustomer(locals.user);

    const form = await request.formData();

    const cardNumber = form.get("cardNumber")?.toString() ?? "";
    const expiry = form.get("expiry")?.toString() ?? "";
    const cvc = form.get("cvc")?.toString() ?? "";
    const checkIn = form.get("checkIn")?.toString() ?? "";
    const checkOut = form.get("checkOut")?.toString() ?? "";

    const property = await db.propertyRepo.findOneOrFail({
      where: { id: params.id },
    });

    const { nights, totalPrice } = calculateBooking(
      checkIn,
      checkOut,
      property.pricePerNight,
    );

    const validation = validateCard({
      cardNumber,
      expiry,
      cvc,
    });

    if (!validation.cardNumber || !validation.expiry || !validation.cvc) {
      return fail(400, {
        paymentError:
          "Invalid card details. Please check your card number, expiry date, and CVC.",
        cardNumber,
        expiry,
        cvc,
        checkIn,
        checkOut,
        nights,
        totalPrice,
      });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate || nights <= 0) {
      return fail(400, {
        paymentError: "Invalid date range.",
        cardNumber,
        expiry,
        cvc,
        checkIn,
        checkOut,
        nights,
        totalPrice,
      });
    }

    await db.bookingRepo.save({
      checkInDate,
      checkOutDate,
      customerUserId: user.id,
      propertyId: params.id,
      bookingPrice: totalPrice,
    });

    throw redirect(303, "/?paid=true");
  },
};
