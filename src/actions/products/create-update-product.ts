"use server";

import { ProductDB } from "@/interfaces";
import prisma from "@/libs/prisma";
import { Product, ProductImage } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createUpdateProduct = async (
	id: string,
	data: Product & { images?: FormData; productImage?: ProductImage[] },
) => {
	try {
		// Desestructura los images ya que el product no posee y toda hacer algo con los tags porque cuando lo editamos es como un string
		// y en realidad prisma lo debe recibir como un arreglo, aunque en el type aparezca como arreglo no lo es.
		const { id, productImage, images: formDataImages, ...rest } = data;
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
					},
				});
			}

			if (formDataImages?.getAll("images")) {
				const images = await uploadImages(
					formDataImages.getAll("images") as File[],
				);

				if (!images) {
					throw new Error("Could not load images");
				}

				await prisma.productImage.createMany({
					data: images.map((url) => ({ url: url!, productId: product.id })),
				});
			}

			return {
				product,
			};
		});

		// Revalidate Path
		revalidatePath("/admin/products");
		revalidatePath(`/admin/products/${prismaTx.product.slug}`);
		revalidatePath(`/product/${prismaTx.product.slug}`);

		return {
			ok: true,
			message: "Product successfully updated",
			product: prismaTx.product,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "Something went wrong",
		};
	}
};

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImages = async (images: File[]) => {
	try {
		const uploadPromises = images.map(async (image) => {
			const buffer = await image.arrayBuffer();
			const base64Image = Buffer.from(buffer).toString("base64");
			return cloudinary.uploader
				.upload(`data:image/png;base64,${base64Image}`, {
					folder: "teslo-shop",
				})
				.then((response) => response.secure_url)
				.catch((error) => {
					console.log(error);
					return null;
				});
		});

		const uploadedImages = await Promise.all(uploadPromises);
		return uploadedImages;
	} catch (error) {
		console.log(error);
		return null;
	}
};
