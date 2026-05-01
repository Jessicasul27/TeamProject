import { db } from "$lib/server/db";
import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51TPMEcBSxo5OS6wey8qzAZFUlMRuXAEQZHRkEkhQXpDqld5Q13sMRG9psfwoxiXSoPD05pS2KgFGfpjDOP1enxNf00ARi8qHt1",
);

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
    const checkInDate = new Date(Number(checkIn));
    const checkOutDate = new Date(Number(checkOut));

    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    const msPerDay = 1000 * 60 * 60 * 24;

    nights = Math.floor(diffTime / msPerDay);

    if (nights > 0) {
      totalPrice = nights * pricePerNight;
    }
  }

  return { nights, totalPrice };
}

function euroToCents(value: number) {
  return Math.round(value * 100);
}

export const load: PageServerLoad = async ({ params }) => {
  const property = await db.propertyRepo.findOneOrFail({
    where: { id: params.id },
    relations: {
      images: true,
      landlord: true,
      bookings: true,
      reviews: {
        user: true,
      },
    },
  });

  return {
    property: structuredClone(property),
  };
};

export const actions: Actions = {
  pay: async ({ request, params, locals, url }) => {
    const user = await requireCustomer(locals.user);

    const form = await request.formData();

    const checkIn = form.get("checkIn")?.toString() ?? "";
    const checkOut = form.get("checkOut")?.toString() ?? "";

    if (!checkIn || !checkOut) {
      return fail(400, {
        paymentError: "Both check-in and check-out dates must be selected.",
        checkIn,
        checkOut,
      });
    }

    const checkInDate = new Date(Number(checkIn));
    const checkOutDate = new Date(Number(checkOut));

    if (
      Number.isNaN(checkInDate.getTime()) ||
      Number.isNaN(checkOutDate.getTime()) ||
      checkOutDate <= checkInDate
    ) {
      return fail(400, {
        paymentError: "Check-out date must be after check-in date.",
        checkIn,
        checkOut,
      });
    }

    const property = await db.propertyRepo.findOneOrFail({
      where: { id: params.id },
    });

    const pricePerNight = Number(property.pricePerNight);

    if (!Number.isFinite(pricePerNight) || pricePerNight <= 0) {
      throw error(500, "Invalid property price.");
    }

    const { nights, totalPrice } = calculateBooking(
      checkIn,
      checkOut,
      pricePerNight,
    );

    if (nights <= 0 || totalPrice <= 0) {
      return fail(400, {
        paymentError: "Invalid booking length.",
        checkIn,
        checkOut,
      });
    }

    // Because the goal is to have as simple of a payment as possible,
    // we create a reference in memory (as opposed to a database-owned object).
    // We then pass it to Stripe as a unique payment reference id
    const bookingReference = [
      "staycraft",
      params.id,
      user.id,
      Date.now(),
      crypto.randomUUID().slice(0, 8),
    ].join("_");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: euroToCents(pricePerNight),
            product_data: {
              name: property.title,
              description: `${nights} night(s)`,
            },
          },
          quantity: nights,
        },
      ],
      client_reference_id: bookingReference,
      metadata: {
        bookingReference,
        propertyId: params.id,
        customerUserId: user.id,
        checkIn,
        checkOut,
        checkInIso: checkInDate.toISOString(),
        checkOutIso: checkOutDate.toISOString(),
        nights: String(nights),
        pricePerNight: String(pricePerNight),
        totalPrice: String(totalPrice),
      },
      success_url: `${url.origin}/properties/${params.id}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${url.origin}/properties/${params.id}?checkIn=${checkIn}&checkOut=${checkOut}`,
    });

    throw redirect(303, session.url!);
  },
};
