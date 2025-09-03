import { Response } from "express";
import { config } from "../config/index";

const setCookies = (res: Response, token: string) => {
	res.cookie("token", token, {
		maxAge: 2 * 24 * 60 * 60 * 1000,
		httpOnly: true,
		sameSite: config.nodeEnv === "production" ? "strict" : "lax",
		secure: config.nodeEnv === "production",
	});
	console.log("cookie set successfully");
};

export default setCookies;
