import NextAuth from "next-auth";
import { config as authConfig } from "@/auth";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;

	const isCheckoutRoute = nextUrl.pathname.startsWith("/checkout");
	const isOrdersRoute = nextUrl.pathname.startsWith("/orders");

	if (!isLoggedIn && (isCheckoutRoute || isOrdersRoute)) {
		return Response.redirect(new URL("/", nextUrl));
	}
});

// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
