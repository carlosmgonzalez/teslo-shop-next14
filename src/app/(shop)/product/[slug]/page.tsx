export const revalidate = 172800; // two days
import { Metadata, ResolvingMetadata } from "next";

import { getProductBySlug } from "@/actions/products/get-product-by-slug";
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  QuantitySelector,
  SizeSelector,
  StockLabel,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { cn } from "@/libs/utils";
import { notFound } from "next/navigation";
import { AddToCart } from "../_components/add-to-cart";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { slug } = params;

  // fetch data
  const response = await getProductBySlug(slug);
  const { product } = response.success!;

  return {
    title: product.title,
    description: product.description,
    // openGraph: {
    //   title: product.title,
    //   description: product.description,
    //   images: [`/products/${product.images[1]}`],
    // },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;
  const response = await getProductBySlug(slug);

  if (response.error || !response.success)
    return (
      <div className="w-full flex items-center justify-center">
        <p className="text-xl font-semibold">{response.error}</p>
      </div>
    );

  const { product } = response.success;

  if (!product) notFound();

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="md:col-span-2">
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className="hidden sm:block"
        />
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className="block sm:hidden"
        />
      </div>
      <div className="col-span-1 px-5">
        <StockLabel slug={slug} />
        <h1
          className={cn(titleFont.className, "antialiased font-bold text-xl")}
        >
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>
        <AddToCart product={product} />
        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
