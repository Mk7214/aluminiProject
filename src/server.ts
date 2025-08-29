import app from "./app";
import { PrismaClient } from "@prisma/client";
const PORT = 3000;
const prisma = new PrismaClient();

app.listen(PORT, () => {
	// prisma.$connect(); //only use for debugging need to remove
	// console.log("database connected successfully");
	console.log(`server is listening on  http://localhost:${PORT}`);
});
