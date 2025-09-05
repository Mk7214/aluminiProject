import { Router } from "express";
import { authRouter } from "./auth/authRoute";
import { userRouter } from "./user/userRoute";

const router = Router();

router.use("/auth", authRouter);
router.use("/me", userRouter);

export { router as apiRoutes };
