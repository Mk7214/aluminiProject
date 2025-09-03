import { Request, Response, NextFunction } from "express";
import { toggleRequset } from "./requestservice";

export const editRequest = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { requestId } = req.params;
		const { status } = req.body;
		const result = await toggleRequset(requestId, status);
		res.status(201).json({
			success: result.success,
			data: result.data,
		});
	} catch (err) {
		next(err);
	}
};
