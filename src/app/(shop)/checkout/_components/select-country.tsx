import prisma from "@/libs/prisma";
import { addressFormSchema } from "@/libs/zod/address-form";
import { UseFormRegister } from "react-hook-form";
import { z } from "zod";

export const SelectCountry = async ({
	register,
}: {
	register: UseFormRegister<z.infer<typeof addressFormSchema>>;
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
