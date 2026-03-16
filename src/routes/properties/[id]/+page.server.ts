import { db } from "$lib/server/db";
import { redirect, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

async function requireCustomer(user: App.Locals["user"]) {
  if (!user) {
    throw redirect(303, "/auth/login");
  }

  const customer = await db.customerRepo.findOne({
    where: { userId: user.id },
  });

  if (!customer) {
    throw redirect(303, "/auth/login");
  }

  return user;
}

export const load: PageServerLoad = async ({ params }) => {
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

export const actions: Actions = {
  prepare: async ({ request, params, locals }) => {
    await requireCustomer(locals.user);

    const form = await request.formData();
    const checkIn = form.get("checkIn")?.toString() ?? "";
    const checkOut = form.get("checkOut")?.toString() ?? "";

    if (!checkIn || !checkOut) {
      return fail(400, {
        bookingError: "Please select both check-in and check-out dates.",
      });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      return fail(400, {
        bookingError: "Check-out date must be after check-in date.",
      });
    }

    throw redirect(
      303,
      `/properties/${params.id}/payment?checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}`,
    );
  },
};
