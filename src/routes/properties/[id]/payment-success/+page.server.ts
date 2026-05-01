import { db } from "$lib/server/db";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
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

export const load: PageServerLoad = async ({ url, params, locals }) => {
  const user = await requireCustomer(locals.user);

  const sessionId = url.searchParams.get("session_id");

  if (!sessionId) {
    throw error(400, "Missing Stripe session ID.");
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    throw error(400, "Payment has not been completed.");
  }

  const metadata = session.metadata ?? {};

  const propertyId = metadata.propertyId;
  const customerUserId = metadata.customerUserId;
  const checkIn = metadata.checkIn;
  const checkOut = metadata.checkOut;
  const totalPrice = Number(metadata.totalPrice);

  if (!propertyId || !customerUserId || !checkIn || !checkOut) {
    throw error(400, "Stripe session is missing booking information.");
  }

  if (propertyId !== params.id) {
    throw error(400, "Stripe session does not match this property.");
  }

  if (customerUserId !== user.id) {
    throw error(403, "Stripe session does not belong to this user.");
  }

  if (!Number.isFinite(totalPrice) || totalPrice <= 0) {
    throw error(400, "Invalid payment amount.");
  }

  const checkInDate = new Date(Number(checkIn));
  const checkOutDate = new Date(Number(checkOut));

  if (
    Number.isNaN(checkInDate.getTime()) ||
    Number.isNaN(checkOutDate.getTime()) ||
    checkOutDate <= checkInDate
  ) {
    throw error(400, "Invalid booking dates.");
  }

  const existingBooking = await db.bookingRepo.findOne({
    where: {
      checkInDate,
      checkOutDate,
      customerUserId: user.id,
      propertyId: params.id,
      bookingPrice: totalPrice,
    },
  });

  const booking =
    existingBooking ??
    (await db.bookingRepo.save({
      checkInDate,
      checkOutDate,
      customerUserId: user.id,
      propertyId: params.id,
      bookingPrice: totalPrice,
    }));

  return {
    booking: structuredClone(booking),
    bookingReference: session.client_reference_id,
    paymentStatus: session.payment_status,
    amountTotal: session.amount_total,
    currency: session.currency,
    propertyId,
    checkIn,
    checkOut,
    totalPrice,
  };
};
