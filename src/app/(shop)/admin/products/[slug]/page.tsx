import { getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
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

	if (!resProducts.ok || !resCategories.ok) {
		toast.error(resProducts.message!);
		redirect("/admin/products");
	}

	const product = resProducts.product!;
	const title = slug ? "Edit product" : "New Product";

	const categories = resCategories.categoies!;

	return (
		<div>
			<Title title={title} />
			<ProductForm product={product} categories={categories} />
		</div>
	);
}
