import {
	IoLogInOutline,
	IoLogOutOutline,
	IoPeopleOutline,
	IoPersonOutline,
	IoShirtOutline,
	IoTicketOutline,
} from "react-icons/io5";

export const routesUser = [
	{
		name: "Profile",
		href: "/profile",
		icon: <IoPersonOutline size={20} />,
	},
	{
		name: "Orders",
		href: "/orders",
		icon: <IoTicketOutline size={20} />,
	},
];

export const routesAdmin = [
	{
		name: "Products",
		href: "/product",
		icon: <IoShirtOutline size={20} />,
	},
	{
		name: "Orders",
		href: "/allorders",
		icon: <IoTicketOutline size={20} />,
	},
	{
		name: "Clients",
		href: "/clients",
		icon: <IoPeopleOutline size={20} />,
	},
];

export const routesAuth = [
	{
		name: "Login",
		href: "/auth/login",
		icon: <IoLogInOutline size={20} />,
	},
	{
		name: "Logout",
		href: "/auth/luogout",
		icon: <IoLogOutOutline size={20} />,
	},
];
