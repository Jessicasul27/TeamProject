import type { Actions, PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { PropertyStatus, PropertyType } from "$lib/enums";
import { error, fail, redirect } from "@sveltejs/kit";

import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

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

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) throw error(401, "Not logged in");
  return {};
};

export const actions: Actions = {
  create: async ({ request, locals }) => {
    const user = locals.user;
    if (!user) throw error(401, "Not logged in");

    const form = await request.formData();

    const title = String(form.get("title") ?? "").trim();
    const shortDescription = String(form.get("shortDescription") ?? "").trim();
    const description = String(form.get("description") ?? "").trim();
    const location = String(form.get("location") ?? "").trim();
    const maxGuests = Number(form.get("maxGuests"));
    const pricePerNight = Number(form.get("pricePerNight"));
    const typeRaw = String(form.get("type") ?? "");
    if (!Object.values(PropertyType).includes(typeRaw as PropertyType)) {
      return fail(400, { message: "Invalid property type" });
    }
    const type = typeRaw as PropertyType;

    const cover = form.get("displayImageFile");
    const gallery = form.getAll("imageFiles");

    if (!title) return fail(400, { message: "Title is required" });
    if (!shortDescription)
      return fail(400, { message: "Short description is required" });
    if (!description) return fail(400, { message: "Description is required" });
    if (!location) return fail(400, { message: "Location is required" });
    if (!Number.isFinite(maxGuests) || maxGuests <= 0)
      return fail(400, { message: "Max guests must be a positive number" });
    if (!Number.isFinite(pricePerNight) || pricePerNight <= 0)
      return fail(400, {
        message: "Price per night must be a positive number",
      });
    if (!(cover instanceof File) || cover.size === 0)
      return fail(400, { message: "Cover image is required" });

    const displayImage = await saveToStaticFolder(cover);

    const created = await db.propertyRepo.save(
      db.propertyRepo.create({
        landlordUserId: user.id,
        title,
        shortDescription,
        description,
        location,
        maxGuests,
        pricePerNight,
        status: PropertyStatus.Inactive,
        type,
        displayImage,
      }),
    );

    const galleryFiles = gallery.filter(
      (f): f is File => f instanceof File && f.size > 0,
    );

    for (const file of galleryFiles) {
      const url = await saveToStaticFolder(file);
      await db.propertyImageRepo.create({
        propertyId: created.id,
        imageUrl: url,
      });
    }

    throw redirect(303, `/landlord/properties/${created.id}`);
  },
};
