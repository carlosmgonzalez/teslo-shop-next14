import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export const Provider = ({ children }: { children: ReactNode }) => {
	return (
		<SessionProvider>
			<Toaster />
			{children}
		</SessionProvider>
	);
};