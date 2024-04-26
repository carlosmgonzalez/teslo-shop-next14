import NextAuth from "next-auth";
import { config as authConfig } from "@/auth";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;
	const role = req.auth?.user.role;

	const isCheckoutRoute = nextUrl.pathname.startsWith("/checkout");
	const isOrdersRoute = nextUrl.pathname.startsWith("/orders");
	const isAdminRote = nextUrl.pathname.startsWith("/admin");

	if (!isLoggedIn && (isCheckoutRoute || isOrdersRoute || isAdminRote)) {
		return Response.redirect(new URL("/", nextUrl));
	}

	if (isLoggedIn && role === "user" && isAdminRote) {
		return Response.redirect(new URL("/", nextUrl));
	}
});

// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
