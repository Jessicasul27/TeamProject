import { db } from "$lib/server/db";
import { error, redirect } from "@sveltejs/kit";
import { PropertyStatus } from "$lib/enums";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const property = await db.propertyRepo.findOne({
    where: { id: params.id },
    relations: { images: true, landlord: { user: true } },
  });

  if (!property) throw error(404, "Property not found");

  return {
    property: structuredClone(property),
  };
};

export const actions: Actions = {
  approve: async ({ params }) => {
    await db.propertyRepo.update(
      { id: params.id },
      { status: PropertyStatus.Active },
    );

    throw redirect(303, "/admin/properties");
  },

  deny: async ({ params }) => {
    await db.propertyRepo.update(
      { id: params.id },
      { status: PropertyStatus.Inactive },
    );

    throw redirect(303, "/admin/properties");
  },
};
