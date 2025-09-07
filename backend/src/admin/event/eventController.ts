import { Request, Response, NextFunction } from "express";
import { createEvent, uploadPictures } from "./eventService";
import { EventBodyType } from "./eventValidation";

export const createEvents = async (
	req: Request<{}, {}, EventBodyType>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result = await createEvent(req.body);
		res.status(201).json({
			success: true,
			message: "Event created  successfully",
			data: result,
		});
	} catch (err) {
		next(err);
	}
};

export const uploadPic = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { eventId } = req.params;
		console.log(eventId);
		const filePath = req.files as Express.Multer.File[];
		const result = await uploadPictures(eventId, filePath);
		console.log("success", result);
		res.status(201).json({
			success: true,
			message: "Files uploaded successfully",
			data: result,
		});
	} catch (err) {
		next(err);
	}
};
