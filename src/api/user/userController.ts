import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../middleware/authenticateMiddleware";
import {
	createComment,
	getAllcomments,
	getEvents,
	getNoLikes,
	toggleLike,
	toggleUpVote,
} from "./userService";
import { success } from "zod";

export const comments = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { eventId } = req.params as { eventId: string };
		const userId = req.user.id;
		const message = req.body;

		const result = await createComment(eventId, userId, message);

		res.status(201).json({
			success: result.success,
			message: "commented successfully",
			data: result.data,
		});
	} catch (err) {
		next(err);
	}
};

export const like = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { eventId } = req.params as { eventId: string };
		const userId = req.user.id;
		const result = await toggleLike(eventId, userId);
		res.status(201).json({
			success: result.success,
			data: result.liked,
		});
	} catch (err) {
		next(err);
	}
};

export const likeComment = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { commentId } = req.params as { commentId: string };
		const userId = req.user.id;
		const result = await toggleUpVote(commentId, userId);
		res.status(201).json({
			success: result.success,
			data: result.liked,
		});
	} catch (err) {
		next(err);
	}
};

export const getAllEvents = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result = await getEvents();
		res.status(201).json({
			success: result.success,
			data: result.data,
		});
	} catch (err) {
		next(err);
	}
};

export const getComments = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { evnetId } = req.params;
		const result = await getAllcomments(evnetId);
		res.status(201).json({
			success: result.success,
			data: result.data,
		});
	} catch (err) {
		next(err);
	}
};

export const getLikes = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { eventId } = req.params;
		const result = await getNoLikes(eventId);
		res.status(201).json({
			success: result.success,
			data: result.data,
		});
	} catch (err) {
		next(err);
	}
};
