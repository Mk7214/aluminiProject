import { Router } from "express";
import {
	comments,
	getAllEvents,
	getComments,
	getLikes,
	like,
	likeComment,
} from "./userController";
import { protect } from "../../middleware/authenticateMiddleware";

const router = Router();

router.post("/event/:eventId", protect, comments);
router.post("/event/:eventId", protect, like);
router.post("/event/:eventId/:commentId", protect, likeComment);
router.get("/events", protect, getAllEvents);
router.get("events/:eventId", protect, getComments);
router.get("events/:eventId", protect, getLikes);

export { router as userRouter };
