"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "@/libs/zod/register-form";
import { login, registerUser } from "@/actions";
import toast from "react-hot-toast";

export const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof registerFormSchema>>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
		const { email, password } = data;

		const response = await registerUser(data);

		if (response.ok === false) {
			toast.error(response.message);
			return;
		}

		if (response.ok === true) {
			toast.success(response.message);

			await login({ email, password });
			window.location.replace("/");
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
			<div className="flex flex-col">
				<label htmlFor="name">Name</label>
				<input
					className="px-5 py-2 border bg-gray-200 rounded"
					type="text"
					{...register("name")}
				/>
				{errors.name?.message && (
					<span className="font-light text-sm text-red-400">
						{errors.name.message}
					</span>
				)}
			</div>

			<div className="flex flex-col">
				<label htmlFor="email">Email</label>
				<input
					className="px-5 py-2 border bg-gray-200 rounded"
					type="email"
					{...register("email")}
				/>
				{errors.email?.message && (
					<span className="font-light text-sm text-red-400">
						{errors.email.message}
					</span>
				)}
			</div>

			<div className="flex flex-col">
				<label htmlFor="email">Password</label>
				<input
					className="px-5 py-2 border bg-gray-200 rounded"
					type="password"
					{...register("password")}
				/>
				{errors.password?.message && (
					<span className="font-light text-sm text-red-400">
						{errors.password.message}
					</span>
				)}
			</div>

			<button type="submit" className="btn-primary">
				Register
			</button>
		</form>
	);
};
