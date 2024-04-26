"use server";

import prisma from "@/libs/prisma";
import { Category, Size } from "@prisma/client";

interface Product {
	id: string;
	description: string;
	images: string[];
	inStock: number;
	price: number;
	sizes: Size[];
	slug: string;
	tags: string[];
	title: string;
	gender: Category;
	productImages: { url: string }[];
}

export const updateProductById = async (id: string, data: Partial<Product>) => {
	try {
		const product = await prisma.product.findUnique({
			where: {
				id,
			},
		});

		if (!product)
			return {
				ok: false,
				message: "Product not found",
			};

		await prisma.product.update({
			where: {
				id,
			},
			data,
		});

		return {
			ok: true,
			message: "Product successfully updated",
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "Something went wrong",
		};
	}
};
