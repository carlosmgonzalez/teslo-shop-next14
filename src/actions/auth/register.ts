"use server";

import { registerFormSchema } from "@/libs/zod/register-form";
import { z } from "zod";
import prisma from "@/libs/prisma";
import bcrypt from "bcryptjs";

export const registerUser = async (
	data: z.infer<typeof registerFormSchema>,
) => {
	const { name, email, password } = data;

	try {
		const usedEmail = await prisma.user.findFirst({
			where: {
				email,
			},
		});

		if (usedEmail) return { ok: false, message: "Emai already in use" };

		const hashedPassword = bcrypt.hashSync(password, 10);

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
			select: {
				id: true,
				email: true,
				name: true,
			},
		});

		return {
			ok: true,
			message: "Successfully registered user",
			user,
		};
	} catch (error) {
		return {
			ok: false,
			message: "Something went wrong",
		};
	}
};
