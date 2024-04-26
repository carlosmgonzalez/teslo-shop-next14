// https://tailwindcomponents.com/component/hoverable-table
import { getAllOrders } from "@/actions";
import { Pagination, Title } from "@/components";
import { cn } from "@/libs/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

interface Props {
	searchParams: {
		page: string;
	};
}

export default async function OrdersAdminPage({ searchParams }: Props) {
	const page = searchParams.page ? +searchParams.page : 1;

	if (isNaN(page)) redirect("/admin/orders");
	if (page <= 0) redirect("/admin/orders");

	const response = await getAllOrders({ page });
	if (!response.ok) redirect("/");

	const orders = response.orders;
	const totalPages = response.totalPages!;

	return (
		<>
			<Title title="Orders" />

			<div className="mb-10">
				<table className="min-w-full">
					<thead className="bg-gray-200 border-b">
						<tr>
							<th
								scope="col"
								className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
							>
								#ID
							</th>
							<th
								scope="col"
								className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
							>
								Full name
							</th>
							<th
								scope="col"
								className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
							>
								Payment state
							</th>
							<th
								scope="col"
								className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
							>
								Options
							</th>
						</tr>
					</thead>
					<tbody>
						{orders?.map((order) => (
							<tr
								key={order.id}
								className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
							>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
									{order.id.split("-").at(-1)}
								</td>
								<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
									{order.orderAddres?.firstName} {order.orderAddres?.lastName}
								</td>
								<td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
									<IoCardOutline
										className={cn(
											order.isPaid ? "text-green-800" : "text-red-800",
										)}
									/>
									<span
										className={cn(
											"mx-2",
											order.isPaid ? "text-green-800" : "text-red-800",
										)}
									>
										{order.isPaid ? "Paid" : "Unpaid"}
									</span>
								</td>
								<td className="text-sm text-gray-900 font-light px-6 ">
									<Link
										href={"/orders/" + order.id}
										className="hover:underline"
									>
										View order
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<Pagination totalPages={totalPages} />
		</>
	);
}
