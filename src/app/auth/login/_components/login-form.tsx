"use client";

import { authenticate } from "@/actions";
import Link from "next/link";
import { useFormState } from "react-dom";

export const LoginForm = () => {
	const [errorMessage, dispatch] = useFormState(authenticate, undefined);

	console.log(errorMessage);

	return (
		<form action={dispatch} className="flex flex-col">
			<label htmlFor="email">Email</label>
			<input
				className="px-5 py-2 border bg-gray-200 rounded mb-5"
				type="email"
				name="email"
			/>

			<label htmlFor="email">Password</label>
			<input
				className="px-5 py-2 border bg-gray-200 rounded mb-5"
				type="password"
				name="password"
			/>

			<button type="submit" className="btn-primary">
				Ingresar
			</button>

			{/* divisor line */}
			<div className="flex items-center my-5">
				<div className="flex-1 border-t border-gray-500"></div>
				<div className="px-2 text-gray-800">O</div>
				<div className="flex-1 border-t border-gray-500"></div>
			</div>

			<span className="text-center">You don&apos;t have an account?</span>
			<Link href="/auth/register" className="btn-secondary text-center">
				Register
			</Link>
		</form>
	);
};
