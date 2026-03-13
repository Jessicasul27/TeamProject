import { PropertyStatus, PropertyType } from "$lib/enums";
import { z } from "zod";

// prettier-ignore
export const propertyEditSchema = z.object({
	id: z.uuid(),
	
	title: z.string()
		.trim()
		.min(1, "Title is required.")
		.max(128, "Title must be at most 128 characters."),

	location: z.string()
		.trim()
		.min(1, "Location is required.")
		.max(128, "Location must be at most 128 characters."),

	type: z.enum(PropertyType, "Property type is required."),

	pricePerNight: z.number()
		.positive("Price per night must be greater than 0."),

	status: z.enum(PropertyStatus, "Status is required."),

	description: z.string()
		.trim()
		.max(5000, "Description must be at most 5000 characters."),

	shortDescription: z.string()
		.trim()
		.max(1000, "Short description must be at most 1000 characters."),

	maxGuests: z.number()
		.int("Max guests must be a whole number.")
		.min(1, "Max guests must be at least 1."),
});

export const deleteImageSchema = z.object({
	imageId: z.uuid(),
});
