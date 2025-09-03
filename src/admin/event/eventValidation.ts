import z from "zod";
export const eventBodySchema = z.object({
	body: z.object({
		title: z.string().min(3, "Length must be greater than 3"),
		description: z.string(), // can use enum to validate only the courses provided by the college
		time: z.string(),
	}),
});

export const eventFileSchema = z.object({
	mimetype: z.enum(["image/jpeg", "image/png", "image/webp", "video/mp4"]),
	size: z.number().max(5 * 1024 * 1024, "File too large (max 5MB)"),
});

export type EventBodyType = z.infer<typeof eventBodySchema>["body"];
export type EventFileType = z.infer<typeof eventFileSchema>;
