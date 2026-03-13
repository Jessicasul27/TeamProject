import { db } from "$lib/server/db";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const properties = await db.propertyRepo.find();

	return {
		properties: properties.map((property) => structuredClone(property)),
	};
};
