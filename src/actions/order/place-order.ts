"use server";

import { auth } from "@/auth";
import { Address } from "@/libs/zod/address-form-schema";
import type { Size } from "@prisma/client";
import prisma from "@/libs/prisma";

interface ProductToOrder {
	productId: string;
	quantity: number;
	size: Size;
}

export const placeOrder = async (
	productsToOrder: ProductToOrder[],
	address: Address,
) => {
	const session = await auth();
	const userId = session?.user.id;
	if (!userId) return { ok: false, message: "There is not user session" };

	const products = await prisma.product.findMany({
		where: {
			id: {
				in: productsToOrder.map((p) => p.productId),
			},
		},
	});

	const itemsInOrder = productsToOrder.reduce((count, p) => {
		count += p.quantity;
		return count;
	}, 0);

	const subTotal = productsToOrder.reduce((count, item) => {
		const product = products.find((p) => p.id === item.productId);
		if (!product) throw new Error("Something went wrong");

		const price = product.price;
		const quantity = item.quantity;

		count += price * quantity;
		return count;
	}, 0);

	const tax = subTotal * 0.15;
	const total = subTotal + tax;

	try {
		const prismaTx = await prisma.$transaction(async (tx) => {
			// Aca hacemos un array de promesas para actializar la cantidad de los productos en stock
			const updateQuantityPromises = products.map((product) => {
				const quantity = productsToOrder
					.filter((p) => p.productId === product.id)
					.reduce((acc, item) => acc + item.quantity, 0);

				if (quantity === 0)
					throw new Error(`${product.id} there is not quantity defined`);

				return tx.product.update({
					where: {
						id: product.id,
					},
					data: {
						inStock: {
							decrement: quantity,
						},
					},
				});
			});

			// Ejecutamos las promesas
			const updatedProducts = await Promise.all(updateQuantityPromises);

			// Revisamos que no hayan pedido una cantidad mayor a lo que se tiene en stock del producto
			updatedProducts.forEach((product) => {
				if (product.inStock < 0)
					throw new Error(
						`The quantity of product ${product.title} ordered exceeds the available stock.`,
					);
			});

			// Creamos la orden y tambien creamos los orderItems
			const order = await tx.order.create({
				data: {
					userId,
					subTotal,
					tax,
					total,
					itemsInOrder,
					orderItem: {
						createMany: {
							data: productsToOrder.map((p) => ({
								productId: p.productId,
								quantity: p.quantity,
								price: products.find((i) => i.id === p.productId)!.price,
								size: p.size,
							})),
						},
					},
				},
			});

			// Creamos el orderAddress
			const { country, ...restAddress } = address;

			const orderAddress = await tx.orderAddres.create({
				data: {
					...restAddress,
					orderId: order.id,
					countryId: country,
				},
			});

			return {
				order,
				orderAddress,
				updatedProducts,
			};
		});

		return {
			ok: true,
			orderId: prismaTx.order.id,
			prismaTx,
			message: "The order was created successfully",
		};
	} catch (error: any) {
		return {
			ok: false,
			message: error?.message,
		};
	}
};
