import { db } from "$lib/server/db";
import type { PageServerLoad } from "./$types";
import { PropertyStatus } from "$lib/enums";

export const load: PageServerLoad = async () => {
  const properties = await db.propertyRepo.find({
    where: { status: PropertyStatus.Pending },
  });

  return {
    properties: structuredClone(properties),
  };
};
