"use server";

import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import prisma from "@/libs/prisma";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
	if (!imageUrl.startsWith("http")) {
		return {
			ok: false,
			message: "No se puede borrar imagenes de FS",
		};
	}

	const imageName = imageUrl.split("/").at(-1)?.split(".")[0] ?? "";

	try {
		await cloudinary.uploader.destroy(imageName);
		const deletedImage = await prisma.productImage.delete({
			where: {
				id: imageId,
			},
			select: {
				product: {
					select: {
						slug: true,
					},
				},
			},
		});

		revalidatePath("/admin/products");
		revalidatePath(`/admin/products/${deletedImage?.product.slug}`);
		revalidatePath(`/product/${deletedImage?.product.slug}`);
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "Something went wrong",
		};
	}
};
