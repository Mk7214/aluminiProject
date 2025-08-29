import { Request, Response, NextFunction } from "express";
import { Logger } from "../utils/logger";
import { config } from "../config/index";

// Custom AppError class
export class AppError extends Error {
	statusCode: number;
	isOperational: boolean;

	constructor(message: string, statusCode = 500, isOperational = true) {
		super(message);
		this.statusCode = statusCode;
		this.isOperational = isOperational;

		Error.captureStackTrace(this, this.constructor);
	}
}

// Global error handler
export const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	_next: NextFunction,
) => {
	const status = err.statusCode || 500;
	const message = err.message || "Something went wrong";

	// Log error details
	Logger.error(message, {
		status,
		stack: err.stack,
		path: req.originalUrl,
		method: req.method,
	});

	// Hide stack traces in production
	if (config.nodeEnv === "production") {
		return res.status(status).json({
			success: false,
			message,
		});
	}

	// In development: send more details
	return res.status(status).json({
		success: false,
		message,
		stack: err.stack,
		error: err,
	});
};
