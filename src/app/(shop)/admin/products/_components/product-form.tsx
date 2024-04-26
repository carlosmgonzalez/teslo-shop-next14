"use client";

import { updateProductById } from "@/actions/products/update-product-by-id";
import { cn } from "@/libs/utils";
// import { Product } from "@/interfaces";
import { Category, Size } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

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

interface Props {
	product: Product;
	categories: Category[];
}

// const productFormSchema = z.object({
// 	  title: z.string(),
// 	  slug: z.string(),
// 	  description: z.string(),
// 	  price: z.number(),
// 	  tags: z.array(z.string()),
// 	  gender: z.
// 	})
//

const sizes = ["XS", "S", "M", "L", "XL", "XXL"] as Size[];

export const ProductForm = ({ product, categories }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		setValue,
		getValues,
	} = useForm<Product>({
		defaultValues: {
			...product,
		},
	});

	const [sizes_, setSizes_] = useState(product.sizes);

	const onSubmit = async (data: Product) => {
		const { sizes, id, price, productImages, images, ...rest } = data;

		console.log(product);

		const newData = { ...rest, price: +price, sizes: sizes_ };

		const res = await updateProductById(product.id, newData);

		if (!res.ok) {
			toast.error(res.message);
			return;
		}

		toast.success(res.message);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
		>
			{/* Textos */}
			<div className="w-full">
				<div className="flex flex-col mb-2">
					<span>Title</span>
					<input
						type="text"
						className="p-2 border rounded-md bg-gray-200"
						{...register("title")}
					/>
				</div>

				<div className="flex flex-col mb-2">
					<span>Slug</span>
					<input
						type="text"
						className="p-2 border rounded-md bg-gray-200"
						{...register("slug")}
					/>
				</div>

				<div className="flex flex-col mb-2">
					<span>Descripción</span>
					<textarea
						rows={5}
						className="p-2 border rounded-md bg-gray-200"
						{...register("description")}
					></textarea>
				</div>

				<div className="flex flex-col mb-2">
					<span>Price</span>
					<input
						type="number"
						className="p-2 border rounded-md bg-gray-200"
						{...register("price")}
					/>
				</div>

				<div className="flex flex-col mb-2">
					<span>Tags</span>
					<input
						type="text"
						className="p-2 border rounded-md bg-gray-200"
						{...register("tags")}
					/>
				</div>

				<div className="flex flex-col mb-2">
					<span>Gender</span>
					<select
						className="p-2 border rounded-md bg-gray-200"
						{...register("gender")}
					>
						<option value="">[Seleccione]</option>
						<option value="men">Men</option>
						<option value="women">Women</option>
						<option value="kid">Kid</option>
						<option value="unisex">Unisex</option>
					</select>
				</div>

				<div className="flex flex-col mb-2">
					<span>Categoria</span>
					<select
						className="p-2 border rounded-md bg-gray-200"
						{...register("categoryId")}
					>
						<option value="">[Select]</option>
						{categories.map((category) => (
							<option value={category.id} key={category.id}>
								{category.name}
							</option>
						))}
					</select>
				</div>

				<button type="submit" className="btn-primary w-full">
					Save
				</button>
			</div>

			{/* Selector de tallas y fotos */}
			<div className="w-full">
				{/* As checkboxes */}
				<div className="flex flex-col">
					<span>Tallas</span>
					<div className="flex flex-wrap">
						{sizes.map((size) => {
							const include = sizes_.includes(size);
							return (
								// bg-blue-500 text-white <--- si está seleccionado
								<div
									onClick={() => {
										if (include) {
											setSizes_((oldSizes) =>
												oldSizes.filter((s) => s !== size),
											);
											return;
										}
										setSizes_((oldSizes) => [...oldSizes, size]);
									}}
									key={size}
									className={cn(
										"flex items-center justify-center w-10 h-10 mr-2 border rounded-md cursor-pointer",
										include && "bg-blue-500 text-white",
									)}
								>
									<span>{size}</span>
								</div>
							);
						})}
					</div>

					<div className="flex flex-col mb-2">
						<span>Fotos</span>
						<input
							type="file"
							multiple
							className="p-2 border rounded-md bg-gray-200"
							accept="image/png, image/jpeg"
						/>
					</div>
				</div>
			</div>
		</form>
	);
};
