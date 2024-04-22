"use server";

import type { AddressDB } from "@/interfaces";
import prisma from "@/libs/prisma";

export const setUserAddress = async (address: AddressDB, userId: string) => {
	try {
		const addressExists = await prisma.userAddress.findUnique({
			where: {
				userId,
			},
		});

		if (addressExists) {
			const updatedAddress = await prisma.userAddress.update({
				where: {
					userId,
				},
				data: address,
			});

			return {
				ok: true,
				message: "Address updated succesfully",
				address: updatedAddress,
			};
		}

		const newAddress = await prisma.userAddress.create({
			data: {
				...address,
				userId,
			},
		});

		return {
			ok: true,
			message: "Address saved successfully",
			address: newAddress,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "Could not save the address",
		};
	}
};
