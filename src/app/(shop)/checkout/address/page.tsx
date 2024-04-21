import { Title } from "@/components";
import Link from "next/link";
import { AddressForm } from "../_components/address-form";
import prisma from "@/libs/prisma";

export default async function AddressPage() {
	const countries = await prisma.country.findMany({
		orderBy: {
			name: "asc",
		},
	});

	return (
		<div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
			<div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
				<Title title="Dirección" subtitle="Dirección de entrega" />
				<AddressForm countries={countries} />
			</div>
		</div>
	);
}
