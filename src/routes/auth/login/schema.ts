import { z } from "zod";

export const schemaLogin = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
  rememberMe: z.boolean().default(false),
  returnUrl: z.string().default(""),
});
