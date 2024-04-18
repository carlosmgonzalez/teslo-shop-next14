import { Role } from "@prisma/client";
import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
	role: Role;
	id: string;
	emailVerified?: boolean;
};

declare module "next-auth" {
	interface Session {
		user: ExtendedUser;
	}
}
