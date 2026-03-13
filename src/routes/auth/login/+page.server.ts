import { loginSchema } from "$lib/schemas/login";
import { auth } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { zod4 } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms/server";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) {
    throw redirect(303, "/");
  }

  return {
    form: await superValidate(zod4(loginSchema)),
  };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod4(loginSchema));
    if (!form.valid) {
      return fail(400, { form });
    }

    await auth.api.signInEmail({
      headers: request.headers,
      body: {
        email: form.data.email,
        password: form.data.password,
        rememberMe: form.data.rememberMe,
      },
    });

    throw redirect(303, "/");
  },
};
