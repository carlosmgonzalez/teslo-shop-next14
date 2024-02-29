"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import { Product } from "@/interfaces";
import { cn } from "@/libs/utils";
import { useCart } from "@/store/cart.store";
import { Size } from "@prisma/client";
import { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);

  const addProductToCart = useCart((state) => state.addProductToCart);

  const addToCart = () => {
    if (!size) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }

    addProductToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
      quantity,
      size,
    });

    setSize(undefined);
    setQuantity(1);
  };

  return (
    <>
      {error && (
        <span className="bg-red-500/50 border border-red-700 text-red-700 px-2 py-1 rounded fade-in">
          Select a size
        </span>
      )}
      <SizeSelector
        availableSize={product.sizes}
        selectedSize={size}
        setSelectedSize={setSize}
      />
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      <button
        onClick={addToCart}
        className={cn("btn-primary my-5", !size && "opacity-70")}
        // disabled={true}
      >
        Add to cart
      </button>
    </>
  );
};
