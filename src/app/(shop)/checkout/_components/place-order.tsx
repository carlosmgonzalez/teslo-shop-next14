"use client";

import { placeOrder } from "@/actions";
import { cn } from "@/libs/utils";
import { useAddress } from "@/store/address.store";
import { useCart } from "@/store/cart.store";
import { currencyFormatter } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const PlaceOrder = () => {
	const [loaded, setLoaded] = useState(false);
	const [isPlacingOrder, setIsPlacingOrder] = useState(false);

	const address = useAddress((state) => state.data);
	const { taxes, total, totalItems, subtotal } = useCart((state) =>
		state.getSummaryInfo(),
	);
	const cart = useCart((state) => state.cart);
	const clearCart = useCart((state) => state.clearCart);

	const router = useRouter();

	const onPlacerOrder = async () => {
		setIsPlacingOrder(true);

		const productToOrder = cart.map((product) => ({
			productId: product.id,
			quantity: product.quantity,
			size: product.size,
		}));

		const response = await placeOrder(productToOrder, address);

		if (!response.ok) {
			toast.error(response.message);
			setIsPlacingOrder(false);
			return;
		}

		toast.success(response.message);
		clearCart();
		router.replace("/orders/" + response.orderId);
	};

	useEffect(() => {
		setLoaded(true);
	}, []);

	if (!loaded) return <span>Loading...</span>;

	return (
		<div className="bg-white bg-ne rounded-xl shadow-xl p-7">
			<h2 className="text-2xl mb-2">Delivery address</h2>
			<div>
				<p>
					{address.firstName} {address.lastName}
				</p>
				<p>{address.address}</p>
				<p>
					{address.country} - {address.city}
				</p>
				<p>{address.postalCode}</p>
			</div>
			<div className="w-full h-0.5 rounded bg-gray-200 my-6" />
			<h2 className="text-2xl mb-2">Order summary</h2>
			<div className="grid grid-cols-2">
				<span>No. Products</span>
				<span className="text-right">{totalItems}</span>
				<span>Subtotal</span>
				<span className="text-right">{currencyFormatter(subtotal)}</span>
				<span>Taxes (%15)</span>
				<span className="text-right">{currencyFormatter(taxes)}</span>
				<span className="mt-5 text-xl font-medium">Total:</span>
				<span className="text-right mt-5 text-xl">
					{currencyFormatter(total)}
				</span>
			</div>
			<div className="mt-5 w-full">
				<span className="text-xs">
					By clicking &quotconfirm&quot you accept our
					<a href="/termsandcondition" className="underline">
						terms and conditions
					</a>{" "}
					and{" "}
					<a href="/privacypolicy" className="underlina">
						privacy policy
					</a>
				</span>
				<button
					// href="/orders/123"
					onClick={onPlacerOrder}
					className={cn(
						"flex justify-center btn-primary mt-2",
						isPlacingOrder && "opacity-50",
					)}
				>
					Confirm
				</button>
			</div>
		</div>
	);
};
