import app from "./app";
const PORT = 3000;

app.listen(PORT, () => {
	// prisma.$connect(); //only use for debugging need to remove
	// console.log("database connected successfully");
	console.log(`server is listening on  http://localhost:${PORT}`);
});
