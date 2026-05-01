import { redirect, error, fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { db } from "$lib/server/db";

export const actions: Actions = {
  pay: async ({ request, params, locals }) => {
    if (!locals.user) {
      throw error(401, "You must be logged in to do this.");
    }

    const form = await request.formData();

    const checkIn = Number(form.get("checkIn") ?? 0);
    const checkOut = Number(form.get("checkOut") ?? 0);

    if (!checkIn || !checkOut) {
      throw error(400, "Both check-in and check-out dates must be selected.");
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      throw error(400, "Check-out date must be after check-in date.");
    }

    const search = new URLSearchParams({
      checkIn: checkIn.toString(),
      checkOut: checkOut.toString(),
    });

    throw redirect(303, `/properties/${params.id}/payment?${search}`);
  },

  review: async ({ request, locals }) => {
    const user = locals.user;

    if (!user) {
      return fail(401, { message: "Not logged in" });
    }

    const formData = await request.formData();

    const rating = Number(formData.get("rating"));
    const comment = String(formData.get("comment"));
    const propertyId = String(formData.get("propertyId"));

    console.log("Received review:", { rating, comment, propertyId });

    if (!rating || rating < 1 || rating > 5 || !comment) {
      return fail(400, { message: "Invalid input" });
    }
    const bookingid = await db.bookingRepo.findOne({
      where: {
        customerUserId: user.id,
        propertyId,
      },
    });
    const hasBooking = await db.bookingRepo.findOne({
      where: {
        customerUserId: user.id,
        propertyId,
        id: bookingid?.id,
      },
    });

    if (!hasBooking) {
      return fail(403, {
        message: "You must stay at this property to review it",
      });
    }

    try {
      await db.reviewRepo.save({
        rating,
        comment,
        customerUserId: user.id,
        propertyId,
        bookingId: hasBooking.id,
      });
    } catch (err) {
      console.error(err);
      return fail(500, { message: "Failed to save review" });
    }

    return { success: true };
  },
};
