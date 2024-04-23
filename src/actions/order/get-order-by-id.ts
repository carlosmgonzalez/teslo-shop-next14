"use server";

import prisma from "@/libs/prisma";

export const getOrderById = async (orderId: string) => {
	try {
		const order = await prisma.order.findFirst({
			where: {
				id: orderId,
			},
			include: {
				orderItem: {
					select: {
						id: true,
						quantity: true,
						size: true,
						price: true,
						product: {
							select: {
								title: true,
								slug: true,
								price: true,
								productImage: {
									select: {
										url: true,
									},
									take: 1,
								},
							},
						},
					},
				},
				orderAddres: true,
			},
		});

		if (!order) {
			return {
				ok: false,
				message: "Order not found",
			};
		}

		return {
			ok: true,
			order,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "Somethin went wrong",
		};
	}
};
