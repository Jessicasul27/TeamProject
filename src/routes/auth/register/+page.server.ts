import { registerSchema } from "$lib/schemas/register";
import { auth } from "$lib/server/auth";
import { db } from "$lib/server/db";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) {
    redirect(303, "/");
  }

  return {
    form: await superValidate(zod4(registerSchema)),
  };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod4(registerSchema));
    if (!form.valid) {
      return fail(400, { form });
    }

    const result = await auth.api.signUpEmail({
      headers: request.headers,
      body: {
        email: form.data.email,
        password: form.data.password,
        name: `${form.data.firstName} ${form.data.lastName}`,
        firstName: form.data.firstName,
        lastName: form.data.lastName,
      },
    });

    const userId = result.user.id;

    switch (form.data.role) {
      case "customer":
        await db.customerRepo.insert({ userId });
        break;

      case "landlord":
        await db.landlordRepo.insert({ userId, incomeShare: 0.7 });
        break;

      default:
        break;
    }

    redirect(303, "/");
  },
};
