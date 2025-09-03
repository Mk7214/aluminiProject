import multer from "multer";
import path from "path";

const createUploads = () => {
	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, "/home/mk14/dev/alumini/backend/temp/uploads/");
		},
		filename: (req, file, cb) => {
			const extension = path.extname(file.originalname);
			const uniqueName =
				Date.now() + "-" + Math.round(Math.random() * 1e9) + extension;
			cb(null, uniqueName);
		},
	});

	return multer({ storage });
};
export default createUploads;
