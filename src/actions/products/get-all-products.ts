"use server";

import prisma from "@/libs/prisma";

interface Props {
	take?: number;
	page?: number;
}

export const getAllProducts = async ({ take = 12, page = 1 }: Props) => {
	if (isNaN(Number(page))) page = 1;
	if (page < 1) page = 1;

	const totalProducts = await prisma.product.count();
	const totalPages = Math.ceil(totalProducts / take);

	const productsDB = await prisma.product.findMany({
		take,
		skip: (page - 1) * take,
		include: {
			productImage: {
				take: 2,
				select: {
					url: true,
				},
			},
			category: {
				select: {
					name: true,
				},
			},
		},
	});

	if (!productsDB) return { ok: false, message: "Products not found" };

	const products = productsDB.map(
		({ productImage, categoryId, category, ...rest }) => ({
			...rest,
			images: productImage.map((image) => image.url),
			category: category.name,
		}),
	);

	return {
		ok: true,
		totalPages,
		currentPage: page,
		products,
	};
};
