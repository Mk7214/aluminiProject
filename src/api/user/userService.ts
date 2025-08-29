// user can like the posts
// user can comment on the posts
// user can edit their details
// user can donate
// uesr can rquest any
// user can upvote a comment
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AppError } from "../../middleware/errorHandler";

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

export const comment = async (
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
