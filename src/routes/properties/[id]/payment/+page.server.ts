import { db } from "$lib/server/db";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { error } from "@sveltejs/kit";

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

  let nights = 0;
  let totalPrice = 0;

  if (checkIn && checkOut) {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const diffTime = checkOutDate.getTime() - checkInDate.getTime();

    const msPerDay = 1000 * 60 * 60 * 24;

    nights = Math.floor(diffTime / msPerDay);

    if (nights > 0) {
      totalPrice = nights * property.pricePerNight;
    }
  }

  return {
    property: structuredClone(property),
    checkIn,
    checkOut,
    nights,
    totalPrice,
  };
};

export const actions: Actions = {
  prepare: async ({ request, params }) => {
    const form = await request.formData();
    const checkIn = form.get("checkIn");
    const checkOut = form.get("checkOut");

    if (!params.id || !checkIn || !checkOut) {
      throw new Error("Missing booking data");
    }

    const checkInDate = new Date(checkIn.toString());
    const checkOutDate = new Date(checkOut.toString());

    if (checkOutDate <= checkInDate) {
      throw error(400, "Invalid date range");
    }

    throw redirect(
      303,
      `/properties/${params.id}/payment?checkIn=${checkIn}&checkOut=${checkOut}`,
    );
  },
};
