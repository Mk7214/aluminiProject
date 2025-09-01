import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../middleware/authenticateMiddleware";
import { comment, toggleLike, toggleUpVote } from "./userService";

export const comments = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { eventId } = req.params as { eventId: string };
		const userId = req.user.id;
		const message = req.body;

		const result = await comment(eventId, userId, message);

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
