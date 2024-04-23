import { Title } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { ProductsInCart } from "./_components/products-in-cart";
import { PlaceOrder } from "./_components/place-order";

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Check your order" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col">
            <span className="text-xl">Your order</span>
            <Link href="/cart" className="underline mb-5">
              Edit
            </Link>

            <ProductsInCart />
          </div>

          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
