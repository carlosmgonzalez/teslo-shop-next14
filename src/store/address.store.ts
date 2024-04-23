import { Address } from "@/libs/zod/address-form-schema";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface State {
	data: Address;
	setAddress: (data: Address) => void;
}

export const useAddress = create<State>()(
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
