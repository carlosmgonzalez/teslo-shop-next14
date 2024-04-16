import { Footer, Sidebar, TopMenu } from "@/components";

export default function ShopLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main>
			<TopMenu />
			<Sidebar />
			<div className="px-2 sm:px-5">{children}</div>
			<Footer />
		</main>
	);
}
