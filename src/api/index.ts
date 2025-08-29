import { Router } from "express";
import { authRouter } from "./auth/authRoute";

const router = Router();

router.use("/auth", authRouter);

export { router as apiRoutes };
