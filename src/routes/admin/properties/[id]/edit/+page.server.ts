import { schemaDeleteImage, schemaUpdateProperty } from "./schema";
import { db } from "$lib/server/db";
import type { Property } from "$lib/server/db/entities/property";
import { fail, redirect } from "@sveltejs/kit";
import { randomUUID } from "node:crypto";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";

const PROPERTY_IMAGES_DIR = resolve("static", "images", "properties");

async function savePropertyImage(file: File): Promise<string> {
  const filename = randomUUID();
  const path = resolve(PROPERTY_IMAGES_DIR, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path, buffer);

  return `/images/properties/${filename}`;
}

export const load: PageServerLoad = async ({ parent }) => {
  const { property } = await parent();

  return {
    form: await superValidate(property, zod4(schemaUpdateProperty)),
    property: {
      displayImage: property.displayImage,
      images: (property.images ?? []).map((image) => {
        return {
          id: image.id,
          imageUrl: image.imageUrl,
        };
      }),
    },
  };
};

export const actions: Actions = {
  updateProperty: async ({ request, url }) => {
    const formData = await request.formData();
    const form = await superValidate(formData, zod4(schemaUpdateProperty));

    if (!form.valid) {
      return fail(400, { form });
    }

    const property = form.data as Partial<Property>;

    const displayFile = formData.get("displayFile");
    const galleryFiles = formData
      .getAll("galleryFiles")
      .filter((file): file is File => file instanceof File && file.size > 0);

    if (displayFile instanceof File && displayFile.size > 0) {
      const path = await savePropertyImage(displayFile);
      property.displayImage = path;
    }

    for (const galleryFile of galleryFiles) {
      const path = await savePropertyImage(galleryFile);
      await db.propertyImageRepo.save({
        propertyId: property.id,
        imageUrl: path,
      });
    }

    await db.propertyRepo.save(property);

    throw redirect(303, url.pathname);
  },

  deleteImage: async ({ request, url }) => {
    const form = await superValidate(request, zod4(schemaDeleteImage));
    if (!form.valid) {
      return fail(400, { form });
    }

    await db.propertyImageRepo.delete(form.data.imageId);

    throw redirect(303, url.pathname);
  },
};
