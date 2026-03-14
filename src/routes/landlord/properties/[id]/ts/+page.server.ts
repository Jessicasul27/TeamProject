import { db } from "$lib/server/db";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ parent, params }) => {
  const data = await parent(); //gets the user id from landlord layout

  const property = await db.propertyRepo.findOne({
    where: { id: params.id, landlordUserId: data.user.id }, //the params id is needed to receive the id of the specific property belonging to a specific landlord (match the landlord id to user, match property id to landlord)
  });

  if (!property) throw error(404, "Property not found");

  return { property: structuredClone(property) };
}) satisfies PageServerLoad;
