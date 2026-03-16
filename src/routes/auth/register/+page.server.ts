import { registerAdapter } from "./schema";
import { auth } from "$lib/server/auth";
import { db } from "$lib/server/db";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) {
    redirect(303, "/");
  }

  return {
    form: await superValidate(registerAdapter),
  };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, registerAdapter);
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
        phoneNumber: form.data.phoneNumber,
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

    throw redirect(303, "/");
  },
};
