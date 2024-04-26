import { cn } from "@/libs/utils";
import { IoCartOutline } from "react-icons/io5";

export const OrderStatus = ({ isPaid }: { isPaid: boolean }) => {
	return (
		<div
			className={cn(
				"w-full flex items-center gap-4 rounded-lg py-2 px-3.5 text-sm font-bold text-white mb-5",
				isPaid ? "bg-green-700" : "bg-red-700",
			)}
		>
			<IoCartOutline size={30} />
			<span>{isPaid ? "Paid" : "Unpaid"}</span>
		</div>
	);
};
