import { zod4, zod4Client } from "sveltekit-superforms/adapters";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
  rememberMe: z.boolean().default(false),
  returnUrl: z.string().default(""),
});

export const loginAdapter = zod4(loginSchema);
export const loginClientAdapter = zod4Client(loginSchema);
