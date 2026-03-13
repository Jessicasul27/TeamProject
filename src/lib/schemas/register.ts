import { z } from "zod";

// prettier-ignore
export const registerSchema = z
	.object({
		firstName: z.string()
			.trim()
			.min(1, "First name is required.")
			.max(64, "First name must be at most 64 characters."),

		lastName: z.string()
			.trim()
			.min(1, "Last name is required.")
			.max(64, "Last name must be at most 64 characters."),

		email: z.email()
			.trim()
			.min(1, "Email is required."),

		password: z.string()
			.min(1, "Password is required.")
			.min(8, "Password must be at least 8 characters.")
			.max(64, "Password must be at most 64 characters."),

		confirmPassword: z.string()
			.min(1, "Confirm password is required."),

		role: z.enum(["customer", "landlord"])
			.default("customer"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords do not match.",
	});
