import GitHub from "next-auth/providers/github";
import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { schemaCredential } from "./libs/zod/credentials";
import prisma from "@/libs/prisma";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

export const config = {
	providers: [
		GitHub,
		Credentials({
			async authorize(credentials) {
				const parseCredential = schemaCredential.safeParse(credentials);

				if (!parseCredential.success) return null;

				const { email, password } = parseCredential.data;

				const user = await prisma.user.findUnique({
					where: {
						email,
					},
				});

				if (!user) return null;

				const validPassword = bcrypt.compareSync(password, user.password);

				if (!validPassword) return null;

				const { password: _, ...rest } = user;

				console.log({ rest });

				return rest;
			},
		}),
	],
	pages: {
		signIn: "/auth/login",
		newUser: "/auth/new-account",
	},
	callbacks: {
		async jwt({ token, user }) {
			// if (!token.sub) return token;
			// const existingUser = await prisma.user.findUnique({
			// 	where: {
			// 		id: token.sub,
			// 	},
			// });
			// if (!existingUser) return token;
			// token.role = existingUser?.role;

			if (user) {
				token.data = user;
			}

			return token;
		},
		session({ session, token }) {
			session.user = token.data as any;
			return session;
		},
	},
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
