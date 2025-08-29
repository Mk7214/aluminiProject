import { z } from "zod";

export const registerSchema = z.object({
	body: z.object({
		name: z.string().min(3, "Length must be greater than 3"),
		email: z.email(),
		password: z.string().min(6, "password must be atleast 6 characters"),
		course: z.string(), // can use enum to validate only the courses provided by the college
		batch: z.string(),
	}),
});

export const loginSchema = z.object({
	body: z.object({
		email: z.email("Invalid email format"),
		password: z.string().min(6),
	}),
});

export type RegisterType = z.infer<typeof registerSchema>["body"];
export type LoginType = z.infer<typeof loginSchema>["body"];
