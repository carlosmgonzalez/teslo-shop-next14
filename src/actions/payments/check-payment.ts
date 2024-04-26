"use server";

import { CheckPayment, TokenPayment } from "@/interfaces";
import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (transactionId: string) => {
	try {
		const bearerToken = await getPayPalBearerToken();

		if (!bearerToken)
			return {
				ok: false,
				message: "Could not get token",
			};

		const checkOrder = await getCheckOrder(bearerToken, transactionId);

		if (checkOrder.status !== "COMPLETED")
			return {
				ok: false,
				message: "The order has not yet been paid with Paypal",
			};

		const orderId = checkOrder.purchase_units[0].invoice_id;

		await prisma.order.update({
			where: {
				id: orderId,
			},
			data: {
				isPaid: true,
				paidAt: new Date(),
			},
		});

		revalidatePath(`/order/${orderId}`);

		return {
			ok: true,
			checkOrder,
			message: "Purchase made correctly",
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "Something went wrong",
		};
	}
};

const getPayPalBearerToken = async () => {
	const c = `${process.env.NEXT_PUBLIC_PAYPAL_ID}:${process.env.PAYPAL_SECRET}`;
	const credentials = btoa(c);

	const headers = new Headers();
	headers.append("Authorization", `Basic ${credentials}`);
	headers.append("Content-Type", "application/x-www-form-urlencoded");

	const urlencoded = new URLSearchParams();
	urlencoded.append("grant_type", "client_credentials");

	const url = process.env.PAYPAL_OAUTH_URL ?? "";

	const response = await fetch(url, {
		method: "POST",
		headers: headers,
		body: urlencoded,
	});

	const data: TokenPayment = await response.json();
	const { access_token } = data;

	return access_token;
};

const getCheckOrder = async (bearerToken: string, transactionId: string) => {
	const headers = new Headers();
	headers.append("Authorization", `Bearer ${bearerToken}`);

	const url = process.env.PAYPAL_ORDERS_URL ?? "";

	const response = await fetch(`${url}/${transactionId}`, {
		method: "GET",
		headers: headers,
	});

	const data: CheckPayment = await response.json();
	const { status, purchase_units } = data;

	return {
		status,
		purchase_units,
	};
};
