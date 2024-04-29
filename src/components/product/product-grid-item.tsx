"use client";

import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ProductImage } from "./product-image";

interface Props {
	product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
	const MiForma = () => (
		<Link
			href={`/product/${product.slug}`}
			className="relative [&>img]:hover:block"
		>
			<ProductImage
				src={product.images[0]}
				alt={product.title}
				className="w-full object-cover"
				width={500}
				height={500}
			/>
			<ProductImage
				src={product.images[1]}
				alt={product.title}
				className="absolute top-0 left-0 z-10 hidden hover:block w-full object-cover"
				width={500}
				height={500}
			/>
		</Link>
	);

	const [displayImage, setDisplayImage] = useState(product.images[0]);
	const FormaFernando = () => {
		return (
			<Link
				onMouseEnter={() => setDisplayImage(product.images[1])}
				onMouseLeave={() => setDisplayImage(product.images[0])}
				href={`/product/${product.slug}`}
			>
				<ProductImage
					src={displayImage}
					alt={product.title}
					className="w-full object-cover rounded-md"
					width={500}
					height={500}
				/>
			</Link>
		);
	};

	return (
		<div className="rounded-md overflow-hidden fade-in">
			<FormaFernando />
			<div className="p-4 flex flex-col">
				<Link href={`/product/${product.slug}`} className="hover:font-semibold">
					{product.title}
				</Link>
				<span className="font-bold">${product.price}</span>
			</div>
		</div>
	);
};
