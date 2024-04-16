"use client";

import { authenticate } from "@/actions";
import { cn } from "@/libs/utils";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { IoInformationOutline } from "react-icons/io5";

export const LoginForm = () => {
	const [errorMessage, dispatch] = useFormState(authenticate, undefined);

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

			<LoginButton />

			<div className="flex h-8 items-end space-x-1">
				{errorMessage && (
					<>
						<IoInformationOutline className="h-5 w-5 text-red-500 bg-red-200 rounded-full border border-red-500" />
						<p className="text-sm text-red-500">{errorMessage}</p>
					</>
				)}
			</div>

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

const LoginButton = () => {
	const { pending } = useFormStatus();

	return (
		<button
			className={cn("btn-primary", pending && "opacity-50")}
			disabled={pending}
		>
			Login
		</button>
	);
};
