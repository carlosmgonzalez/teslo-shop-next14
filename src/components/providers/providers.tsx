"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<PayPalScriptProvider
			options={{
				clientId: process.env.NEXT_PUBLIC_PAYPAL_ID ?? "",
				intent: "capture",
				currency: "USD",
			}}
		>
			<SessionProvider>
				<Toaster />
				{children}
			</SessionProvider>
		</PayPalScriptProvider>
	);
};
