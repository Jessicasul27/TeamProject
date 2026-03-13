import { db } from "$lib/server/db";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const customers = await db.customerRepo.find({
    relations: {
      user: true,
    },
  });

  return {
    customers: customers.map((customer) => structuredClone(customer)),
  };
};
