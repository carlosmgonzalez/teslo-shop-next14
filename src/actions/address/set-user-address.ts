import prisma from "@/libs/prisma";
import { addressFormSchema } from "@/libs/zod/address-form";
import { z } from "zod";

export interface AddressDB {
	firstName: string;
	lastName: string;
	city: string;
	postalCode: string;
	phoneNumber: string;
	address: string;
	userId: string;
	countryId: string;
}

export const setUserAddress = async (userId: string, address: AddressDB) => {
	try {
		const addressExists = await prisma.userAddress.findUnique({
			where: {
				userId,
			},
		});

		if (addressExists) {
			await prisma.userAddress.update({
				where: {
					userId,
				},
				data: address,
			});
		}

		await prisma.userAddress.create({
			data: address,
		});
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "Could not save the address",
		};
	}
};
