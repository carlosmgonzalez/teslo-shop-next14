export const revalidate = 60;

import { Pagination, ProductGrid, Title } from "@/components";
import { notFound, redirect } from "next/navigation";
import { getProductsByGender } from "@/actions/products/get-products-by-gender";
import { Gender } from "@prisma/client";

interface Props {
  params: { gender: Gender };
  searchParams: {
    page: number;
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = params;

  const genders = ["men", "women", "kid"];
  if (!genders.includes(gender)) notFound();

  const page = searchParams.page ? +searchParams.page : 1;
  if (isNaN(+page)) redirect("/");
  if (page <= 0) redirect("/");

  const res = await getProductsByGender({ page, gender });
  const { error, success } = res;

  if (error) return <p>Products not found, look your database</p>;
  if (!success) return <p>Something went wrong</p>;

  const { products, totalPages, currentPage } = success;
  if (products.length === 0) redirect("/");

  return (
    <>
      <Title
        title="Shop"
        subtitle={`${gender.slice(0, 1).toLocaleUpperCase()}${gender.slice(
          1
        )}'s products`}
        className="mb-2"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
