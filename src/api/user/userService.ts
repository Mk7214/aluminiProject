// user can like the posts
// user can comment on the posts
// user can edit their details
// user can donate
// uesr can rquest any
// user can upvote a comment
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AppError } from "../../middleware/errorHandler";
import { RequestBodyType } from "./userValidation";

const prisma = new PrismaClient();

export const toggleLike = async (eventId: string, userId: string) => {
	//try creating the like first
	//P2002 prisma error code for unique condtraints voilation
	try {
		await prisma.like.create({ data: { eventId, userId } });
		return { success: true, liked: true };
	} catch (err) {
		if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
			await prisma.like.delete({
				where: { eventId_userId: { eventId, userId } },
			});
			return { success: true, liked: false };
		}
		throw new AppError("unable to like the post");
	}
};

export const createComment = async (
	eventId: string,
	userId: string,
	message: string,
) => {
	if (!message.trim()) throw new AppError("comment cannot be empty");
	try {
		const data = await prisma.comment.create({
			data: {
				commentMessage: message,
				eventId,
				userId,
			},
		});

		return { data: data, success: true };
	} catch (err) {
		throw new AppError(`unable to create message: ${err.message}`);
	}
};

export const toggleUpVote = async (commentId: string, userId: string) => {
	//try creating the like first
	//P2002 prisma error code for unique condtraints voilation
	try {
		await prisma.upVote.create({ data: { commentId, userId } });
		return { success: true, liked: true };
	} catch (err) {
		if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
			await prisma.upVote.delete({
				where: { commentId_userId: { commentId, userId } },
			});
			return { success: true, liked: false };
		}
		throw new AppError("unable to like the post");
	}
};

// getposts
export const getEvents = async () => {
	try {
		const posts = await prisma.event.findMany();
		return { success: true, data: posts };
	} catch (err) {
		throw new AppError("unable to get events");
	}
};

//getcomments
export const getAllcomments = async (eventId: string) => {
	try {
		const comments = await prisma.comment.findMany({ where: { eventId } });
		return { success: true, data: comments };
	} catch (err) {
		throw new AppError(`unable to get comments err: ${err.message}`);
	}
};

//getLikes
export const getNoLikes = async (eventId: string) => {
	try {
		const numberOfLikes = await prisma.like.count({
			where: {
				eventId,
			},
		});
		return { success: true, data: numberOfLikes };
	} catch (err) {
		throw new AppError(`unable to get likes err: ${err.message}`);
	}
};

//request
export const createRequest = async (data: RequestBodyType, userId: string) => {
	try {
		const res = await prisma.requests.create({
			data: {
				userId,
				title: data.title,
				topic: data.topic,
				description: data.description,
				datetime: data.datetime,
				email: data.email,
			},
		});
		return { success: true, data: res };
	} catch (err) {
		throw new AppError("ubable to create requsest");
	}
};
