import { db } from "$lib/server/db";
import type { Booking } from "$lib/server/db/entities/booking";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  await db.bookingRepo.save({
    checkInDate: new Date(),
    checkOutDate: new Date(),
    customerUserId: "66176b0f-3e12-4450-97aa-e56a276ed96d",
    propertyId: "dda3a898-ec68-45d4-9b8d-5a9c770a132b",
    bookingPrice: 123.45,
  } satisfies Partial<Booking>);

  return json({ success: true });
};
