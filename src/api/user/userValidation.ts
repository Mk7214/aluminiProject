import z from "zod";
export const requestBodySchema = z.object({
	body: z.object({
		email: z.string(),
		title: z.string().min(3, "Length must be greater than 3"),
		topic: z.string().min(3),
		description: z.string(), // can use enum to validate only the courses provided by the college
		datetime: z.string(),
	}),
});

export type RequestBodyType = z.infer<typeof requestBodySchema>["body"];
