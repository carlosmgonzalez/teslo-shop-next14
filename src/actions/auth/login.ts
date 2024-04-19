"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const authenticate = async (
	prevState: string | undefined,
	formData: FormData,
) => {
	try {
		await signIn("credentials", {
			...Object.fromEntries(formData),
			redirectTo: "/",
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return "Invalid credentials";
				default:
					return "Something went wrong";
			}
		}
		throw error;
	}
};

export const login = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: "/",
		});

		return {
			ok: true,
			message: "Successful registration",
		};
	} catch (error) {
		return {
			ok: false,
			message: "Something went wrong",
		};
	}
};
