import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodRawShape } from "zod";

export const validate =
	(schema: ZodObject<ZodRawShape>) =>
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const parsed = await schema.parseAsync({
				body: req.body,
				query: req.query,
				params: req.params,
			});

			// Type assertions to match Express types
			req.body = parsed.body;
			req.query = parsed.query as any;
			req.params = parsed.params as any;
			return next();
		} catch (error) {
			// Pass the error to the centralized error handler
			return next(error);
		}
	};
