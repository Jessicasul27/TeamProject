import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ parent }) => {
  const data = await parent();

  if (!data.user) {
    throw error(401, "You must be logged in to access this page.");
  }

  if (!data.user.customer) {
    throw error(403, "You must be a customer to access this page.");
  }

  return {
    user: data.user,
  };
};
