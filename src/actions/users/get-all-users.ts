"use server";

import { auth } from "@/auth";
import prisma from "@/libs/prisma";

interface Props {
	take?: number;
	page?: number;
}

export const getAllUsers = async ({ take = 4, page = 1 }: Props) => {
	try {
		const session = await auth();
		if (session?.user.role != "admin")
			return {
				ok: false,
				message: "Unauthorized user",
			};

		const totalUsers = await prisma.user.count({
			where: {
				id: {
					not: session.user.id,
				},
			},
		});
		const totalPages = Math.ceil(totalUsers / take);

		const users = await prisma.user.findMany({
			take,
			skip: (page - 1) * take,
			orderBy: {
				name: "asc",
			},
			where: {
				id: {
					not: session.user.id,
				},
			},
		});

		if (!users)
			return {
				ok: false,
				message: "Users not found",
			};

		return {
			ok: true,
			message: "Users found",
			users,
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
