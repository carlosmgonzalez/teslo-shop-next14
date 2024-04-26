export const revalidate = 0;

import { getAllUsers } from "@/actions";
import { Pagination, Title } from "@/components";
import { redirect } from "next/navigation";
import { SetUserRole } from "./_components/user-role";

interface Props {
	searchParams: {
		page: string;
	};
}

export default async function ClientsPage({ searchParams }: Props) {
	const page = searchParams.page ? +searchParams.page : 1;

	if (isNaN(page)) redirect("/admin/clients");

	const response = await getAllUsers({ page });

	if (!response.ok) redirect("/");

	const users = response.users!;
	const totalPages = response.totalPages;

	return (
		<div className="mb-10">
			<Title title="Clients" />
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
							Email
						</th>
						<th
							scope="col"
							className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
						>
							Role
						</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr
							key={user.id}
							className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
						>
							<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
								{user.id.split("-").at(-1)}
							</td>
							<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
								{user.name}
							</td>
							<td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
								{user.email}
							</td>
							<td className="text-sm text-gray-900 font-light px-6 ">
								<SetUserRole user={user} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<Pagination totalPages={totalPages || 0} />
		</div>
	);
}
