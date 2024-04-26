"use server";

import { auth } from "@/auth";
import prisma from "@/libs/prisma";

interface Props {
	take?: number;
	page?: number;
}

export const getAllOrders = async ({ take = 3, page = 1 }: Props) => {
	try {
		if (page < 1) page = 1;

		const totalOrders = await prisma.order.count();
		const totalPages = Math.ceil(totalOrders / take);

		const session = await auth();
		if (session?.user.role !== "admin")
			return {
				ok: false,
				message: "Unauthorized user",
			};

		const orders = await prisma.order.findMany({
			take,
			skip: (page - 1) * take,
			orderBy: {
				createdAt: "desc",
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

		if (!orders)
			return {
				ok: false,
				message: "There are not orders now",
			};

		return {
			ok: true,
			orders,
			totalPages,
			currentPage: page,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "Something went wrong",
		};
	}
};
