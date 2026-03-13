import { db } from "$lib/server/db";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
  const data = await parent();

  const properties = await db.propertyRepo.find({
    where: { landlordUserId: data.user.id },
  });

  return {
    properties: properties.map((property) => structuredClone(property)),
  };
};
