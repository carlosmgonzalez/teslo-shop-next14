"use client";

import { createUpdateProduct } from "@/actions";
import { cn } from "@/libs/utils";
import { productFormSchema } from "@/libs/zod/product-form-schema";
import { Category, Product, ProductImage, Size } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
	product: Partial<Product> & {
		images?: string[];
		productImage?: ProductImage[];
	};
	categories: Category[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"] as Size[];

export const ProductForm = ({ product, categories }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		getValues,
		setValue,
		watch,
	} = useForm<Product & { images: string[]; productImages?: ProductImage[] }>({
		defaultValues: {
			...product,
		},
	});

	const [sizes_, setSizes_] = useState(product.sizes || []);

	// Este es otra forma de cambiar los sizes sin tenes que crear un useState aparte
	const onSizeChanged = (size: Size) => {
		const sizes = new Set(getValues("sizes"));
		sizes.has(size) ? sizes.delete(size) : sizes.add(size);
		setValue("sizes", Array.from(sizes));
	};

	// Y esto es para que se ven los cambios cuando se hace un setValue()
	watch("sizes");

	const onSubmit = async (
		data: Product & { images?: string[]; productImages?: ProductImage[] },
	) => {
		const { id, sizes, price, ...rest } = data;
		const newData = {
			id: id ? id : "",
			price: +price,
			sizes: sizes_,
			...rest,
		};

		const res = await createUpdateProduct(product.id || "", {
			...newData,
			sizes: newData.sizes || [],
		});

		if (!res.ok) {
			toast.error(res.message);
			return;
		}

		toast.success(res.message);
	};

	const onSubmit_ = async (data: Product & { images: string[] }) => {
		const formData = new FormData();
		if (product.id) formData.append("id", product.id);
		formData.append("title", data.title);
		formData.append("price", data.price.toString());
		formData.append("sizes", data.sizes.toString());
		const data_ = Object.fromEntries(formData); // Esto para parar de tipo FormData a un objeto de js.
		const productParsed = productFormSchema.safeParse(data_);
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
						{...register("title", { required: true })}
					/>
				</div>

				<div className="flex flex-col mb-2">
					<span>Slug</span>
					<input
						type="text"
						className="p-2 border rounded-md bg-gray-200"
						{...register("slug", { required: true })}
					/>
				</div>

				<div className="flex flex-col mb-2">
					<span>Descripción</span>
					<textarea
						rows={5}
						className="p-2 border rounded-md bg-gray-200"
						{...register("description", { required: true })}
					></textarea>
				</div>

				<div className="flex flex-col mb-2">
					<span>Price</span>
					<input
						type="number"
						className="p-2 border rounded-md bg-gray-200"
						{...register("price", { required: true, min: 0 })}
					/>
				</div>

				<div className="flex flex-col mb-2">
					<span>Tags</span>
					<input
						type="text"
						className="p-2 border rounded-md bg-gray-200"
						{...register("tags", { required: true })}
					/>
				</div>

				<div className="flex flex-col mb-2">
					<span>Gender</span>
					<select
						className="p-2 border rounded-md bg-gray-200"
						{...register("gender", { required: true })}
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
						{...register("categoryId", { required: true })}
					>
						<option value="">[Select]</option>
						{categories.map((category) => (
							<option value={category.id} key={category.id}>
								{category.name}
							</option>
						))}
					</select>
				</div>

				<button
					type="submit"
					className={cn("btn-primary w-full", !isValid && "opacity-50")}
					disabled={!isValid}
				>
					Save
				</button>
			</div>

			{/* Selector de tallas y fotos */}
			<div className="w-full">
				<div className="flex flex-col mb-2">
					<span>In Stock</span>
					<input
						type="number"
						className="p-2 border rounded-md bg-gray-200"
						{...register("inStock", { required: true, min: 0 })}
					/>
				</div>

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
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
						{product.productImage &&
							product.productImage.map((image) => (
								<div key={image.id} className="w-full">
									<Image
										src={`/products/${image.url}`}
										alt={image.url}
										width={200}
										height={200}
										className="rounded-t shadow-md w-full"
									/>
									<button
										className="px-2 py-1.5 bg-red-500 hover:bg-red-700 rounded-b w-full text-white font-medium"
										type="button"
									>
										Delete
									</button>
								</div>
							))}
					</div>
				</div>
			</div>
		</form>
	);
};
