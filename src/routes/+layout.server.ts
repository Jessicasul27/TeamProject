import { db } from "$lib/server/db";
import type { User } from "$lib/server/db/entities/user";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
	let user: User | null = null;

	if (event.locals.user) {
		user = await db.userRepo.findOne({
			where: { id: event.locals.user.id },
			relations: {
				customer: true,
				landlord: true,
				admin: true,
			},
		});
	}

	if (!user) {
		return { user: null };
	}

	return {
		user: structuredClone(user),
	};
};
