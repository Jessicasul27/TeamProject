import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";

export const load: PageServerLoad = async ({ parent }) => {
  const data = await parent();

  if (!data.user) {
    throw error(401, "You must be logged in to access this page.");
  }

  const bookings = data.user.customer
    ? await db.bookingRepo.find({
        where: { customerUserId: data.user.id },
        relations: { property: true },
      })
    : null;

  const properties = data.user.landlord
    ? await db.propertyRepo.find({
        where: { landlordUserId: data.user.id },
      })
    : null;

  return {
    user: data.user,
    bookings: data.user.customer ? structuredClone(bookings) : null,
    properties: data.user.landlord ? structuredClone(properties) : null,
  };
};
