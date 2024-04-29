import { getOrderById } from "@/actions";
import { auth } from "@/auth";
import { PayPalButton, ProductImage, Title } from "@/components";
import { currencyFormatter } from "@/utils";
import Image from "next/image";
import { redirect } from "next/navigation";
import { OrderStatus } from "../_components/order-status";

interface Props {
	params: {
		id: string;
	};
}

export default async function OrderPage({ params }: Props) {
	const { id } = params;

	const session = await auth();
	const user = session!.user;

	const response = await getOrderById(id);
	if (!response.ok) redirect("/");

	const order = response.order!;

	if (user.role != "admin" && order?.userId !== user.id) redirect("/");

	const address = order.orderAddres;
	const itemsInOrder = order.orderItem;

	return (
		<div className="flex justify-center items-center mb-72 px-10 sm:px-0">
			<div className="flex flex-col w-[1000px]">
				<Title title={`Order #${id.split("-").at(-1)}`} />
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
					<div className="flex flex-col">
						<OrderStatus isPaid={order.isPaid} />
						<div className="flex flex-col gap-4">
							{itemsInOrder.map((item) => (
								<div key={item.id} className="flex">
									<ProductImage
										src={`${item.product.productImage.forEach((a) => a.url)}`}
										width={150}
										height={100}
										alt={item.product.title}
										className="rounded mr-5 aspect-auto"
									/>
									<div>
										<p className="font-semibold">{item.product.title}</p>
										<p className="font-medium">Size: {item.size}</p>
										<p className="font-medium">
											{item.quantity} x ${item.price}
										</p>
										<p className="font-medium">
											Subtotal: {currencyFormatter(item.price * item.quantity)}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="w-full">
						<div className="bg-white bg-ne rounded-xl shadow-xl p-7">
							<h2 className="text-2xl mb-1">Delivery address</h2>
							<div>
								<p>
									{address?.lastName}, {address?.firstName}
								</p>
								<p>{address?.address}</p>
								<p>
									{address?.city}, {address?.countryId}
								</p>
								<p>CP: {address?.postalCode}</p>
							</div>
							<div className="w-full h-0.5 rounded bg-gray-200 my-6" />
							<h2 className="text-2xl mb-1">Order summary</h2>
							<div className="grid grid-cols-2">
								<span>No. Products</span>
								<span className="text-right">{order?.itemsInOrder}</span>
								<span>Subtotal</span>
								<span className="text-right">
									{currencyFormatter(order!.subTotal)}
								</span>
								<span>Taxes (%15)</span>
								<span className="text-right">
									{currencyFormatter(order!.tax)}
								</span>
								<span className="mt-5 text-xl font-medium">Total:</span>
								<span className="text-right mt-5 text-xl">
									{currencyFormatter(order!.total)}
								</span>
							</div>
							<div className="mt-5 w-full">
								{order.isPaid ? (
									<OrderStatus isPaid={order.isPaid} />
								) : (
									<PayPalButton amount={order!.total} orderId={order.id} />
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
