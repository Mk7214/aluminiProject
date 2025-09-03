import { Router } from "express";
import { createEvents, uploadPic } from "./event/eventController";
import createUploads from "../utils/fileUpload";
import {
	getAllEvents,
	getComments,
	getLikes,
} from "../api/user/userController";

const router = Router();
const upload = createUploads();

router.post("/events", createEvents);
router.post("/events/:eventId/uploadPic", upload.array("pic"), uploadPic);
router.patch("/events", createEvents);
router.patch("/events/:eventId/uploadPic", upload.array("pic"), uploadPic);
router.get("/events", getAllEvents);
router.get("events/:eventId", getComments);
router.get("events/:eventId", getLikes);

export { router as adminRoutes };
