import {
  ProductMobileSlideshow,
  ProductSlideshow,
  QuantitySelector,
  SizeSelector,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { cn } from "@/libs/utils";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = initialData.products.find((product) => product.slug === slug);

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
        <h1
          className={cn(titleFont.className, "antialiased font-bold text-xl")}
        >
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>
        {/* todo: selector de tallas y cantidades */}
        <SizeSelector
          availableSize={product.sizes}
          selectedSize={product.sizes[0]}
        />
        <QuantitySelector quantity={5} />
        <button className="btn-primary my-5">Add to card</button>
        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
