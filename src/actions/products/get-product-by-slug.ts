"use server";

import prisma from "@/libs/prisma";

export const getProductBySlug = async (slug: string) => {
	try {
		const productDB = await prisma.product.findUnique({
			where: {
				slug,
			},
			include: {
				productImage: true,
			},
		});

		if (!productDB) return { ok: false, message: "Product not found" };

		return {
			ok: true,
			product: {
				...productDB,
				images: productDB.productImage.map((image) => image.url),
			},
		};
	} catch (error) {
		console.log(error);
		return { ok: false, messsage: "Something went wrong" };
	}
};
