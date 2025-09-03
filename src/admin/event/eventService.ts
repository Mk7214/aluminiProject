import { PrismaClient } from "@prisma/client";
import { EventBodyType, EventFileType } from "./eventValidation";
import { AppError } from "../../middleware/errorHandler";

const prisma = new PrismaClient();

export const createEvent = async (data: EventBodyType) => {
	try {
		const event = await prisma.event.create({
			data: {
				title: data.title,
				description: data.description,
				time: data.time,
			},
		});

		return { data };
	} catch (err) {
		throw new AppError(`unable to create event ${err}`);
	}
};

// TODO: need to add cleanUp fuction if database write fails
export const uploadPictures = async (
	eventId: string,
	data: Express.Multer.File[],
) => {
	try {
		const result = await prisma.photos.createMany({
			data: data.map((pic) => ({
				eventId,
				path: pic.path,
				size: pic.size,
				mimetype: pic.mimetype,
				originalname: pic.originalname,
				filename: pic.filename,
			})),
		});
		return result.count;
	} catch (err) {
		throw new AppError(`unable to upload file ${err}`);
	}
};
