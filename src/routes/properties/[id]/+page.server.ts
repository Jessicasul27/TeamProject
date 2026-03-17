import { redirect, error } from "@sveltejs/kit";
import type { Actions } from "./$types";

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
      return error(400, "Check-out date must be after check-in date.");
    }

    const search = new URLSearchParams({
      checkIn: checkIn.toString(),
      checkOut: checkOut.toString(),
    });

    throw redirect(303, `/properties/${params.id}/payment?${search}`);
  },
};
