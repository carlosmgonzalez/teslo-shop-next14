"use client";

import { cn } from "@/libs/utils";
import { addressFormSchema } from "@/libs/zod/address-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAddress } from "@/store/address.store";
import { useEffect, useState } from "react";

interface Props {
	countries: {
		name: string;
		id: string;
	}[];
}

export const AddressForm = ({ countries }: Props) => {
	const setAddress = useAddress((state) => state.setAddress);
	const data = useAddress((state) => state.data);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<z.infer<typeof addressFormSchema>>({
		resolver: zodResolver(addressFormSchema),
		defaultValues: data,
	});

	const [remember, setRemember] = useState(false);

	useEffect(() => {
		reset(data);
	}, [data]);

	const onSubmit = (data: z.infer<typeof addressFormSchema>) => {
		setAddress(data);
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2"
				id="addressForm"
			>
				<div className="flex flex-col mb-2">
					<span>First Name</span>
					<input
						type="text"
						className="p-2 border rounded-md bg-gray-200"
						{...register("firstName")}
					/>
				</div>

				<div className="flex flex-col mb-2">
					<span>Last Name</span>
					<input
						type="text"
						className="p-2 border rounded-md bg-gray-200"
						{...register("lastName")}
					/>
				</div>

				<div className="flex flex-col mb-2">
					<span>Address</span>
					<input
						type="text"
						className="p-1 border rounded-md bg-gray-200"
						{...register("address")}
					/>
				</div>

				<div className="flex flex-col mb-2">
					<span>Address (optional)</span>
					<input
						type="text"
						className="p-2 border rounded-md bg-gray-200"
						{...register("addressOptional")}
					/>
				</div>

				<div className="flex flex-col mb-2">
					<span>Postal Code</span>
					<input
						type="text"
						className="p-2 border rounded-md bg-gray-200"
						{...register("postalCode")}
					/>
				</div>

				<div className="flex flex-col mb-2">
					<span>City</span>
					<input
						type="text"
						className="p-1 border rounded-md bg-gray-200"
						{...register("city")}
					/>
				</div>

				{/* <SelectCountry register={register} /> */}

				<div className="flex flex-col mb-2">
					<span>Country</span>
					<select
						className="p-2 border rounded-md bg-gray-200"
						{...register("country")}
					>
						<option value="">[ Seleccione ]</option>
						{countries.map((country) => (
							<option key={country.id} value={country.id}>
								{country.name}
							</option>
						))}
					</select>
				</div>

				<div className="flex flex-col mb-2">
					<span>Phone Number</span>
					<input
						type="text"
						className="p-2 border rounded-md bg-gray-200"
						{...register("phoneNumber")}
					/>
				</div>
			</form>

			<div className="flex flex-col gap-5 mt-5">
				<div className="inline-flex items-center">
					<label
						className="relative flex cursor-pointer items-center rounded-full"
						htmlFor="checkbox"
					>
						<input
							type="checkbox"
							className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
							id="checkbox"
							onChange={() => setRemember(!remember)}
							checked={remember}
						/>
						<div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-3.5 w-3.5"
								viewBox="0 0 20 20"
								fill="currentColor"
								stroke="currentColor"
								strokeWidth="1"
							>
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								></path>
							</svg>
						</div>
					</label>
					<span>Remember address?</span>
				</div>

				<button
					className={cn(
						"btn-primary flex w-full sm:w-1/2 justify-center",
						!isValid && "opacity-50",
					)}
					type="submit"
					form="addressForm"
					disabled={!isValid}
				>
					Siguiente
				</button>
			</div>
		</>
	);
};
