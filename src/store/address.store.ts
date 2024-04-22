import { addressFormSchema } from "@/libs/zod/address-form-schema";
import { z } from "zod";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type AddressState = z.infer<typeof addressFormSchema>;

interface Address {
	data: AddressState;
	setAddress: (data: AddressState) => void;
}

export const useAddress = create<Address>()(
	devtools(
		persist(
			(set) => ({
				data: {
					firstName: "",
					lastName: "",
					address: "",
					addressOptional: "",
					country: "",
					city: "",
					postalCode: "",
					phoneNumber: "",
				},
				setAddress: (data) => set({ data }),
			}),
			{ name: "address-store", storage: createJSONStorage(() => localStorage) },
		),
	),
);
