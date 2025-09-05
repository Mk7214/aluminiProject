import multer from "multer";
declare global {
	namespace Express {
		interface Request {
			// For single upload
			file?: Express.Multer.File;

			// For multiple uploads
			files?:
				| Express.Multer.File[]
				| { [fieldname: string]: Express.Multer.File[] };
		}
	}
}
