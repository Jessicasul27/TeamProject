import { db } from "$lib/server/db";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, params }) => {
  const user = locals.user;
  if (!user) throw error(401, "Not logged in");

  const property = await db.propertyRepo.findOne({
    where: { id: params.id, landlordUserId: user.id },
  });

  if (!property) throw error(404, "Property not found");

  return { property: structuredClone(property) };
};
