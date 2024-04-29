"use client";

import { ProductImage } from "@/components";
import { useCart } from "@/store/cart.store";
import { currencyFormatter } from "@/utils";
import Image from "next/image";

export const ProductsInCart = () => {
	const cart = useCart((state) => state.cart);

	return (
		<div className="flex flex-col gap-4">
			{cart.map((product) => (
				<div key={`${product.size}-${product.id}`} className="flex">
					<ProductImage
						src={product.image}
						width={150}
						height={100}
						alt={product.title}
						className="rounded mr-5 aspect-auto"
					/>
					<div>
						<span>
							<span className="font-medium">
								{product.size} - {product.title}
							</span>
						</span>
						<p>
							<span className="font-semibold">
								{product.quantity} x {currencyFormatter(product.price)}
							</span>
						</p>
					</div>
				</div>
			))}
		</div>
	);
};
