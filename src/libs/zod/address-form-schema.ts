import { z } from "zod";

export const addressFormSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	address: z.string().min(1),
	addressOptional: z.string().optional(),
	postalCode: z.string().min(1),
	city: z.string().min(1),
	country: z.string().min(1),
	phoneNumber: z.string().min(1),
});

export type Address = z.infer<typeof addressFormSchema>;
