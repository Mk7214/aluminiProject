import { PrismaClient } from "@prisma/client";
import { AppError } from "../../middleware/errorHandler";

const prisma = new PrismaClient();

export const toggleRequset = async (
	requestId: string,
	status: "APPROVED" | "REJECTED",
) => {
	try {
		const result = await prisma.requests.update({
			where: {
				id: requestId,
			},
			data: {
				status,
			},
		});

		return { result };
	} catch (err) {
		throw new AppError("unable to approveRequset");
	}
};
