import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/index";

const generateToken = (payload: JwtPayload) => {
	try {
		return jwt.sign(payload, config.jwtsecret, { expiresIn: "5d" });
	} catch (err) {
		throw new Error(err);
	}
};

const verifyToken = (token: string) => {
	try {
		const decoded = jwt.verify(token, config.jwtsecret);
		return decoded;
	} catch (err) {
		throw new Error(err);
	}
};

export { generateToken, verifyToken };

// TODO: need to add refersh token
