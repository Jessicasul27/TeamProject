import { db } from "$lib/server/db";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ params, parent }) => {
  const property = await db.propertyRepo.findOneOrFail({
    where: { id: params.id },
    relations: {
      images: true,
      landlord: true,
    },
  });

  return {
    property: structuredClone(property),
  };
};
