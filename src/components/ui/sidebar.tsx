"use client";

import { logout } from "@/actions";
import { cn } from "@/libs/utils";
import { useSidebar } from "@/store/sidebar.store";
import { routesAdmin, routesAuth, routesUser } from "@/utils";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";

export const Sidebar = () => {
	const isOpen = useSidebar((state) => state.isOpen);
	const setIsOpen = useSidebar((state) => state.setIsOpen);

	const { data: session } = useSession();
	const isAuhtenticated = !!session?.user;
	const role = session?.user.role;

	return (
		<div>
			<div
				onClick={setIsOpen}
				className={cn(
					`fixed top-0 w-full z-10 bg-neutral-400/50 backdrop-blur-sm
          transition-opacity ease-linear duration-300`,
					isOpen ? "opacity-100 h-full" : "opacity-0 h-0",
				)}
			/>
			<nav
				className={cn(
					`fixed top-0 right-0 z-10 w-[300px] h-screen shadow-2xl bg-white px-5
          transform transition-all ease-linear duration-300`,
					isOpen ? "opacity-100" : "translate-x-full opacity-0",
				)}
			>
				<button
					onClick={setIsOpen}
					className="absolute top-5 right-5 rounded p-1 bg-neutral-200/50 hover:bg-neutral-300/50"
				>
					<IoCloseOutline className="w-5 h-5" />
				</button>
				<div className="relative mt-14 w-full">
					<form action="">
						<input
							type="text"
							placeholder="Search"
							className="w-full text-lg pl-3 pr-10 py-1.5 h-8 rounded-md border border-neutral-300 focus:outline-none focus:border-neutral-500 focus:border-2"
						/>
						<button type="submit" className="absolute top-1.5 right-4">
							<IoSearchOutline className="w-5 h-5" />
						</button>
					</form>
				</div>
				<div className="w-full mt-10 flex flex-col gap-4">
					{role === Role.user &&
						routesUser.map((route) => (
							<Link
								key={route.href}
								href={route.href}
								className="flex items-center gap-2 hover:bg-gray-100 rounded transition-all px-2 py-1.5"
								onClick={() => setIsOpen()}
							>
								{route.icon}
								<span className="text-lg">{route.name}</span>
							</Link>
						))}
					{role === Role.admin && (
						<>
							{routesUser.map((route) => (
								<Link
									key={route.href}
									href={route.href}
									className="flex items-center gap-2 hover:bg-gray-100 rounded transition-all px-2 py-1.5"
									onClick={() => setIsOpen()}
								>
									{route.icon}
									<span className="text-lg">{route.name}</span>
								</Link>
							))}
							<div className="w-full h-px bg-gray-200 my-5" />
							{routesAdmin.map((route) => (
								<Link
									key={route.href}
									href={route.href}
									className="flex items-center gap-2 hover:bg-gray-100 rounded transition-all px-2 py-1.5"
									onClick={() => setIsOpen()}
								>
									{route.icon}
									<span className="text-lg">{route.name}</span>
								</Link>
							))}
						</>
					)}
					{isAuhtenticated && <div className="w-full h-px bg-gray-200 my-5" />}
					{routesAuth.map((route) =>
						route.name == "Logout"
							? isAuhtenticated && (
									<button
										key={route.href}
										onClick={() => logout()}
										className="flex items-center gap-2 hover:bg-gray-100 rounded transition-all px-2 py-1.5"
									>
										{route.icon}
										<span className="text-lg">{route.name}</span>
									</button>
								)
							: !isAuhtenticated && (
									<Link
										key={route.href}
										href={route.href}
										className="flex items-center gap-2 hover:bg-gray-100 rounded transition-all px-2 py-1.5"
										onClick={() => setIsOpen()}
									>
										{route.icon}
										<span className="text-lg">{route.name}</span>
									</Link>
								),
					)}
				</div>
			</nav>
		</div>
	);
};
