import { db } from "$lib/server/db";
import type { User } from "$lib/server/db/entities/user";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ depends, locals }) => {
  depends("auth:session");

  let user: User | null = null;

  if (locals.user) {
    user = await db.userRepo.findOne({
      where: { id: locals.user.id },
      relations: {
        customer: true,
        landlord: true,
        admin: true,
      },
    });
  }

  const properties = await db.propertyRepo.find({
    select: {
      location: true,
    },
    order: {
      location: "ASC",
    },
  });

  const counties = [
    ...new Set(
      properties
        .map((property) => property.location.trim())
        .filter((location) => location.length > 0),
    ),
  ];

  return {
    counties,
    user: user ? structuredClone(user) : null,
  };
};
