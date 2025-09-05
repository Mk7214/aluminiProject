import { Response, Request, NextFunction } from "express";
import { registerUser, loginUser } from "./authService";
import { RegisterType, LoginType } from "./authValidation";
import setCookies from "../../utils/setCookies";

export const register = async (
	req: Request<{}, {}, RegisterType>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = await registerUser(req.body);
		setCookies(res, user.token);
		res.status(201).json({
			success: true,
			message: "User Registered Successfully",
			data: user,
		});
	} catch (err) {
		next(err);
	}
};

export const login = async (
	req: Request<{}, {}, LoginType>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = await loginUser(req.body);
		setCookies(res, user.token);
		res.status(201).json({
			success: true,
			message: "User Login Successfully",
			data: user,
		});
	} catch (err) {
		next(err);
	}
};

// TODO: implement logout
// TODO: implement getUser
