"use server";

import { auth } from "@/auth";
import prisma from "@/libs/prisma";

export const setTransactionId = async (
	transactionId: string,
	orderId: string,
) => {
	try {
		const session = await auth();
		if (!session?.user) {
			return {
				ok: false,
				message: "There is not active session",
			};
		}

		const orderExists = await prisma.order.findUnique({
			where: {
				id: orderId,
				userId: session.user.id,
			},
		});

		if (!orderExists) {
			return {
				ok: false,
				message: "Order not found",
			};
		}

		await prisma.order.update({
			where: {
				id: orderId,
			},
			data: {
				transactionId,
			},
		});

		return {
			ok: true,
			message: "Transaction executed correctly",
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "Something went wrong",
		};
	}
};
