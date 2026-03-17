import { db } from "$lib/server/db";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ params }) => {
  const property = await db.propertyRepo.findOne({
    where: { id: params.id },
    relations: {
      images: true,
      bookings: true,
      reviews: {
        user: true,
      },
    },
  });

  if (!property) {
    throw error(404, `Property with id '${params.id}' was not found.`);
  }

  const { bookings, ...rest } = structuredClone(property);

  return {
    property: {
      ...rest,
      bookings: bookings.map(({ checkInDate, checkOutDate }) => {
        return {
          checkInDate,
          checkOutDate,
        };
      }),
    },
  };
};
