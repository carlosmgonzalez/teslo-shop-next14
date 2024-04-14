import GitHub from "next-auth/providers/github";
import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { schemaCredential } from "./libs/zod/credentials";

export const config = {
	providers: [
		GitHub,
		Credentials({
			async authorize(credentials) {
				const parseCredential = schemaCredential.safeParse(credentials);

				if (!parseCredential.success) return null;

				const { email, password } = parseCredential.data;

				console.log(email, password);

				return null;
			},
		}),
	],
	pages: {
		signIn: "/auth/login",
		newUser: "/auth/new-account",
	},
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
