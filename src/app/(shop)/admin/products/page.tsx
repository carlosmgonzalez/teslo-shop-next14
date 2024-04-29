import { getAllProducts } from "@/actions";
import { Pagination, ProductImage, Title } from "@/components";
import { currencyFormatter } from "@/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
	searchParams: {
		page: string;
	};
}

export default async function ProductsAdminPage({ searchParams }: Props) {
	const page = searchParams.page ? +searchParams.page : 1;

	if (isNaN(+page)) redirect("/");
	if (page <= 0) redirect("/");

	const res = await getAllProducts({ page });

	if (!res.ok) return <h2>{res.message}</h2>;

	const products = res.products!;
	const totalPages = res.totalPages!;

	return (
		<div className="mb-10">
			<div className="w-full mb-2 flex justify-between">
				<Title title="Products" />
				<Link
					href={`/admin/products/new`}
					className="place-self-end mb-4 px-2 py-1.5 rounded-md bg-blue-500 text-white font-semibold"
				>
					New Product
				</Link>
			</div>
			<table className="min-w-full">
				<thead className="bg-gray-200 border-b">
					<tr>
						<th
							scope="col"
							className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
						>
							Image
						</th>
						<th
							scope="col"
							className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
						>
							Title
						</th>
						<th
							scope="col"
							className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
						>
							Price
						</th>
						<th
							scope="col"
							className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
						>
							Gender
						</th>

						<th
							scope="col"
							className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
						>
							In Stock
						</th>
						<th
							scope="col"
							className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
						>
							Sizes
						</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr
							key={product.id}
							className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
						>
							<td className="">
								<Link href={`/product/${product.slug}`}>
									<ProductImage
										src={product.images[0]}
										alt={product.title}
										className="ml-4"
										width={50}
										height={50}
									/>
								</Link>
							</td>
							<td className="text-sm text-gray-900 font-light px-6 py-4">
								<Link href={`/admin/products/${product.slug}`}>
									<span className="font-medium underline">{product.title}</span>
								</Link>
							</td>
							<td className="text-sm text-gray-900 font-light px-6 py-4">
								{currencyFormatter(product.price)}
							</td>
							<td className="text-sm text-gray-900 font-light px-6 py-4">
								{product.gender}
							</td>
							<td className="text-sm text-gray-900 font-light px-6 py-4">
								{product.inStock}
							</td>
							<td className="text-sm text-gray-900 font-light px-6 py-4">
								{product.sizes.map((size) => (
									<span key={size}>{size + " "}</span>
								))}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<Pagination totalPages={totalPages || 0} />
		</div>
	);
}
