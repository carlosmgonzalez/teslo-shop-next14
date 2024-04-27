import { getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "../_components/product-form";
import { getCatories } from "@/actions/categories/get-categories";

interface Props {
	params: {
		slug: string;
	};
}

export default async function ProductAdminPage({ params }: Props) {
	const { slug } = params;

	const [resProducts, resCategories] = await Promise.all([
		getProductBySlug(slug),
		getCatories(),
	]);

	const product = resProducts.product; // Product & {images: string[], productImage: ProductImage[]}
	if (!product && slug !== "new") redirect("/admin/products");

	const title = slug !== "new" ? "Edit product" : "New Product";

	const categories = resCategories.categoies!;

	return (
		<div>
			<Title title={title} />
			<ProductForm product={product ?? {}} categories={categories} />
		</div>
	);
}
