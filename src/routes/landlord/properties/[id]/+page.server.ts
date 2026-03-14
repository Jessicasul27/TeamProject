import { db } from "$lib/server/db";
import { error, fail, redirect } from "@sveltejs/kit";
import { PropertyStatus, PropertyType } from "$lib/enums";
import type { Actions, PageServerLoad } from "./$types";

type Property = {status: PropertyStatus};


export const load: PageServerLoad = async ({ parent, params }) => {
  const data = await parent();

  const property = await db.propertyRepo.findOne({
    where: { id: params.id, landlordUserId: data.user.id },
  });

  if (!property) throw error(404, "Property not found");

  return { property: structuredClone(property) };
};

function assertInactive(property: Property) {
  if (property.status !== PropertyStatus.Inactive) {
    throw error(
      409,
      "You can only edit/delete/submit while the property is Inactive.",
    );
  }
}

async function getOwnedProperty(locals: App.Locals, id: string) {
  const user = locals.user;
  if (!user) throw error(401, "Not logged in");

  const property = await db.propertyRepo.findOne({
    where: { id, landlordUserId: user.id },
  });

  if (!property) throw error(404, "Property not found");

  return property;
}

export const actions: Actions = {
  update: async ({ request, locals, params }) => {
    const property = await getOwnedProperty(locals, params.id);
    assertInactive(property);

    const form = await request.formData();
    const title = String(form.get("title") ?? "").trim();
    const description = String(form.get("description") ?? "").trim();
    const location = String(form.get("location") ?? "").trim();
    const maxGuests = Number(form.get("maxGuests"));
    const pricePerNight = Number(form.get("pricePerNight"));

    const typeRaw = String(form.get("type") ?? "");
    const type = Object.values(PropertyType).includes(typeRaw as PropertyType)
      ? (typeRaw as PropertyType)
      : null;

    if (!title) return fail(400, { message: "Title is required" });
    if (!description) return fail(400, { message: "Description is required" });
    if (!location) return fail(400, { message: "Location is required" });
    if (!Number.isFinite(maxGuests) || maxGuests <= 0)
      return fail(400, { message: "Max guests must be a positive number" });
    if (!Number.isFinite(pricePerNight) || pricePerNight <= 0)
      return fail(400, {
        message: "Price per night must be a positive number",
      });
    if (!type) return fail(400, { message: "Invalid property type" });

    await db.propertyRepo.update(
      { id: params.id },
      { title, description, location, maxGuests, pricePerNight, type },
    );

    return { updated: true };

  },

  submit: async ({ locals, params }) => {
    const property = await getOwnedProperty(locals, params.id);
    assertInactive(property);

    await db.propertyRepo.update(
      { id: params.id },
      { status: PropertyStatus.Pending },
    );

    return { submitted: true };
  },

  delete: async ({ locals, params }) => {
    const property = await getOwnedProperty(locals, params.id);
    assertInactive(property);

    await db.propertyRepo.delete({ id: params.id });

    throw redirect(303, "/landlord/properties");
  },
};
