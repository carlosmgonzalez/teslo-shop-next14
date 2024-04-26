"use server";

import prisma from "@/libs/prisma";
import type { Role } from "@prisma/client";

export const setUserRole = async (userId: string, role: Role) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!user)
			return {
				ok: false,
				message: "User not found",
			};

		await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				role,
			},
		});

		return {
			ok: true,
			message: "User role updated",
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "Something went wrong",
		};
	}
};
