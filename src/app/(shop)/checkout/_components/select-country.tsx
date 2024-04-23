import prisma from "@/libs/prisma";
import { Address } from "@/libs/zod/address-form-schema";
import { UseFormRegister } from "react-hook-form";

export const SelectCountry = async ({
	register,
}: {
	register: UseFormRegister<Address>;
}) => {
	const countries = await prisma.country.findMany({
		orderBy: {
			name: "asc",
		},
	});

	return (
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
	);
};
