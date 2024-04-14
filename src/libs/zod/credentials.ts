import { z } from "zod";

export const schemaCredential = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export type typeCredential = z.infer<typeof schemaCredential>;
