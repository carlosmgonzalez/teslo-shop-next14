import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
import type { Category } from "@/interfaces/product.interface";

interface Props {
  params: { id: Category };
}

export default function CategoryPage({ params }: Props) {
  const categories = ["men", "women", "kid"];
  const products = initialData.products.filter(
    (product) => product.gender === params.id
  );

  if (!categories.includes(params.id)) notFound();

  return (
    <>
      <Title
        title="Shop"
        subtitle={`${params.id
          .slice(0, 1)
          .toLocaleUpperCase()}${params.id.slice(1)}'s products`}
        className="mb-2"
      />
      <ProductGrid products={products} />
    </>
  );
}
