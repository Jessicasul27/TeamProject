import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
  const data = await parent();

  if (!data.user) {
    throw error(401, "You must be logged in to access this page.");
  }

  return {
    user: data.user,
  };
};
