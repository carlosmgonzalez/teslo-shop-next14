export const revalidate = 60;

import { getAllProducts } from "@/actions/products/get-all-products";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page: number;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? +searchParams.page : 1;

  if (isNaN(+page)) redirect("/");

  if (page <= 0) redirect("/");

  const res = await getAllProducts({ page });
  const { error, success } = res;

  if (error) return <p>Products not found, look your database</p>;
  if (!success) return <p>Something went wrong</p>;

  const { products, totalPages, currentPage } = success;
  if (products.length === 0) redirect("/");

  return (
    <>
      <Title title="Shop" subtitle="All products" className="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
