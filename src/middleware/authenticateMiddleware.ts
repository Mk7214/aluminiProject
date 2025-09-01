import { PrismaClient, User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "./errorHandler";
import { config } from "../config/index";

const prisma = new PrismaClient();

export interface AuthenticatedRequest extends Request {
	user?: Pick<User, "id" | "email">;
}
//ptotects the route
export const protect = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.cookies.token;
		if (!token) throw new AppError("Unauthorized, token not found", 401);
		let decoded: { id: string; email: string };
		try {
			decoded = jwt.verify(token, config.jwtsecret) as {
				id: string;
				email: string;
			};
		} catch (err) {
			if (err instanceof jwt.TokenExpiredError) {
				throw new AppError("Token expired", 401);
			}
			throw new AppError("Invalid token", 401);
		}

		const user = await prisma.user.findUnique({
			where: {
				id: decoded.id,
			},
			select: {
				id: true,
				email: true,
			},
		});
		if (!user) throw new AppError("User not Found", 404);
		req.user = user;
		next();
	} catch (err) {
		next(err);
	}
};
