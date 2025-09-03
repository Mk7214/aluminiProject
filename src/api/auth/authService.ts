import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { verifyToken, generateToken } from "../../utils/generateToken";
import { RegisterType, LoginType } from "./authValidation";
import { AppError } from "../../middleware/errorHandler";
import { Logger } from "../../utils/logger";
import { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient({
	omit: {
		user: {
			password: true,
		},
	},
});

export const registerUser = async (data: RegisterType) => {
	//check if the user exist
	const existingUser = await prisma.user.findUnique({
		where: {
			email: data.email,
		},
	});
	if (existingUser) throw new AppError("User already exist", 400);
	const hashPass = await bcrypt.hash(data.password, 10);
	const user = await prisma.user.create({
		data: {
			name: data.name,
			email: data.email,
			regNo: data.regNo,
			password: hashPass,
			course: data.course,
			batch: data.batch,
		},
		select: {
			id: true,
			email: true,
			name: true,
			course: true,
			batch: true,
		},
	});
	Logger.info("User created");

	//set the jwt cookie
	const userToken: JwtPayload = user;
	const token = generateToken(userToken);

	//return token and user data
	return { user, token };
};

//login
export const loginUser = async (data: LoginType) => {
	//check if user exist
	const user = await prisma.user.findUnique({
		where: {
			email: data.email,
		},
		omit: {
			password: false,
		},
	});

	if (!user) throw new AppError("User does not exist", 404);

	// compare password using bcrypt.compare
	const match = await bcrypt.compare(data.password, user.password);
	if (!match) throw new AppError("Password is incorrect", 401);

	//set the jwt cookie
	const userToken: JwtPayload = user;
	const token = generateToken(userToken);

	//return user and token
	return {
		user: {
			id: user.id,
			email: user.email,
			name: user.name,
			course: user.course,
			batch: user.batch,
		},
		token,
	};
};

export const getUser = async (token: string) => {
	const data = verifyToken(token) as JwtPayload;
	const user = await prisma.user.findUnique({
		where: {
			id: data.id,
			email: data.email,
		},
	});
	if (!user) throw new AppError("Error getting user");
	return user;
};
