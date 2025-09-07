import express from "express";
import { apiRoutes } from "./api";
import { adminRoutes } from "./admin";
import cookie from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler";
import createUploads from "./utils/fileUpload";

const app = express();
// multer for file handling

createUploads();

//middleware
app.use(express.json());
app.use(cookie());

// app.get("/", (req, res) => {
// 	res.cookie("cookie", "1234567");
// 	res.send("Cookie has set");
// });
//
// app.get("/cookie", (req, res) => {
// 	res.send("Welcome");
// 	console.log(req.cookies);
// });

app.use("/api", apiRoutes); //api routes
app.use("/admin", adminRoutes); //admin routes

app.use("", (req, res) => {
	res.send("<h1>Page Not Found <h1>");
});

app.use(errorHandler);
export default app;
