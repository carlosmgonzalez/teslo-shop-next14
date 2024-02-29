import { Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./_components/products-in-cart";
import { OrderSummary } from "./_components/order-summary";

export default function CartPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Cart" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col">
            <span className="text-xl">Add more items</span>
            <Link href="/" className="underline mb-5">
              Continue shopping
            </Link>
            <ProductsInCart />
          </div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
