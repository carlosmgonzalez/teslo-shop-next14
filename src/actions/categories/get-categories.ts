"use server";

import prisma from "@/libs/prisma";

export const getCatories = async () => {
	try {
		const categoies = await prisma.category.findMany({
			orderBy: {
				name: "asc",
			},
		});

		if (!categoies)
			return {
				ok: false,
				message: "There are not catories",
			};

		return {
			ok: true,
			message: "Found categoies successfully",
			categoies,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "Something went wrong",
		};
	}
};
