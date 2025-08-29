import dotenv from "dotenv";

dotenv.config(); //can give object with path as an argument

export const config = {
	port: process.env.PORT,
	dbUri: process.env.SAMPLE_MONGO_URL,
	jwtsecret: process.env.JWT_SECRET,
	nodeEnv: process.env.NODE_ENV,
};
