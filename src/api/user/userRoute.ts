import { Router } from "express";
import { comments, like, likeComment } from "./userController";
import { protect } from "../../middleware/authenticateMiddleware";

const router = Router();

router.post("/event/:eventId", protect, comments);
router.post("/event/:eventId", protect, like);
router.post("/event/:eventId/:commentId", protect, likeComment);
