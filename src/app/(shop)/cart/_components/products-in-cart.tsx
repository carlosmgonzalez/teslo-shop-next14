"use client";

import { ProductImage, QuantitySelector } from "@/components";
import { useCart } from "@/store/cart.store";
import Image from "next/image";
import Link from "next/link";

export const ProductsInCart = () => {
	const deleteProductToCart = useCart((state) => state.deleteProductToCart);
	const setQuantity = useCart((state) => state.setQuantityProductToCart);
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
						<Link href={`/product/${product.slug}`}>
							<p className="font-semibold">{product.title}</p>
						</Link>
						<p>
							Price:{` `}
							<span className="font-semibold">${product.price}</span>
						</p>
						<p>
							Size:{` `}
							<span className="font-semibold">{product.size}</span>
						</p>
						<p>Quantity:</p>
						<QuantitySelector
							size={23}
							quantity={product.quantity}
							setQuantity={(value) => setQuantity(product, value)}
						/>
						<button
							className="underline mb-3"
							onClick={() => deleteProductToCart(product)}
						>
							Remove
						</button>
					</div>
				</div>
			))}
		</div>
	);
};
