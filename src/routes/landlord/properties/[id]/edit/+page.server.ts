import { db } from "$lib/server/db";
import { error, fail, redirect } from "@sveltejs/kit";
import { PropertyStatus, PropertyType } from "$lib/enums";
import type { Actions, PageServerLoad } from "./$types";

import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

type Property = { status: PropertyStatus };

const directory = path.join(process.cwd(), "static", "images", "properties");

function extension(filename: string) {
  const ext = path.extname(filename).toLowerCase();
  return [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)
    ? ext
    : ".jpg";
}

async function saveToStaticFolder(file: File) {
  await fs.mkdir(directory, { recursive: true });
  const filename = `${crypto.randomUUID()}${extension(file.name)}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(directory, filename), buffer);
  return `/images/properties/${filename}`;
}

export const load: PageServerLoad = async ({ parent, params }) => {
  const data = await parent();

  const property = await db.propertyRepo.findOne({
    where: { id: params.id, landlordUserId: data.user.id },

    relations: { images: true },
  });

  if (!property) throw error(404, "Property not found");

  return { property: structuredClone(property) };
};

function assertEditable(property: Property) {
  if (property.status === PropertyStatus.Active) {
    throw error(409, "You can not edit a property while it is active");
  }
}

function assertSubmittable(property: Property) {
  if (property.status === PropertyStatus.Pending) {
    throw error(409, "Already submitted (Pending review).");
  } else if (property.status === PropertyStatus.Active) {
    throw error(409, "Already approved (Active).");
  }
}

async function getOwnedProperty(locals: App.Locals, id: string) {
  const user = locals.user;
  if (!user) throw error(401, "Not logged in");

  const property = await db.propertyRepo.findOne({
    where: { id, landlordUserId: user.id },
    relations: { images: true },
  });

  if (!property) throw error(404, "Property not found");

  return property;
}

export const actions: Actions = {
  update: async ({ request, locals, params }) => {
    const property = await getOwnedProperty(locals, params.id);
    assertEditable(property);

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

    const cover = form.get("displayImageFile");
    if (cover instanceof File && cover.size > 0) {
      const newCoverUrl = await saveToStaticFolder(cover);
      await db.propertyRepo.update(
        { id: params.id },
        { displayImage: newCoverUrl },
      );
    }

    const removeImageIds = form.getAll("removeImageIds").map(String);
    for (const imageId of removeImageIds) {
      const img = await db.propertyImageRepo.findOne({
        where: { id: imageId, propertyId: params.id },
      });

      if (img) {
        await db.propertyImageRepo.delete({ id: imageId });
      }
    }

    const gallery = form.getAll("imageFiles");
    const galleryFiles = gallery.filter(
      (f): f is File => f instanceof File && f.size > 0,
    );

    for (const file of galleryFiles) {
      const url = await saveToStaticFolder(file);
      await db.propertyImageRepo.save(
        db.propertyImageRepo.create({
          propertyId: params.id,
          imageUrl: url,
        }),
      );
    }

    //return { updated: true };
    throw redirect(303, "/landlord/properties/");
  },

  submit: async ({ locals, params }) => {
    const property = await getOwnedProperty(locals, params.id);
    assertSubmittable(property);

    await db.propertyRepo.update(
      { id: params.id },
      { status: PropertyStatus.Pending },
    );

    //return { submitted: true };
    throw redirect(303, "/landlord/properties/");
  },

  delete: async ({ locals, params }) => {
    const property = await getOwnedProperty(locals, params.id);
    assertEditable(property);

    await db.propertyRepo.delete({ id: params.id });

    throw redirect(303, "/landlord/properties");
  },
};
