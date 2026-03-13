import { auth } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request }) => {
  await auth.api.signOut({
    headers: request.headers,
  });

  redirect(303, "/");
};
