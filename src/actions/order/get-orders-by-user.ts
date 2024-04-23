"use server";

import { auth } from "@/auth";
import prisma from "@/libs/prisma";

export const getOrdersByUser = async () => {
	try {
		const session = await auth();

		if (!session?.user) {
			return {
				ok: false,
				message: "There is not active session",
			};
		}

		const orders = await prisma.order.findMany({
			where: {
				userId: session.user.id,
			},
			include: {
				orderAddres: {
					select: {
						firstName: true,
						lastName: true,
					},
				},
			},
		});

		if (!orders) {
			return {
				ok: false,
				message: "There are not orders",
			};
		}

		return {
			ok: true,
			message: "Order founded",
			orders,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "somethin went wrong",
		};
	}
};
