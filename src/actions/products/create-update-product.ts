"use server";

import prisma from "@/libs/prisma";
import { Product, ProductImage } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createUpdateProduct = async (
	id: string,
	data: Product & { images?: string[]; productImage?: ProductImage[] },
) => {
	try {
		const { id, productImage, tags, ...rest } = data;
		data.slug = data.slug.toLowerCase().replace(" ", "-").trim();

		const prismaTx = await prisma.$transaction(async () => {
			let product: Product;

			if (id) {
				product = await prisma.product.update({
					where: {
						id,
					},
					data: {
						...rest,
					},
				});
			} else {
				product = await prisma.product.create({
					data: {
						...rest,
						tags,
					},
				});
			}

			console.log(product);

			return {
				product,
			};
		});

		// Revalidate Path

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
