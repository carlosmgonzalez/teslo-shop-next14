"use client";

import { cn } from "@/libs/utils";
import { useCart } from "@/store/cart.store";
import { currencyFormatter } from "@/utils/currency-formatter";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";

export const OrderSummary = () => {
  const { subtotal, taxes, total, totalItems } = useCart((state) =>
    state.getSummaryInfo()
  );

  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(true);
  }, []);

  if (load && totalItems === 0) redirect("/empty");

  return (
    <div className="bg-white bg-ne rounded-xl shadow-xl p-7 h-fit">
      <h2 className="text-2xl mb-2">Order summary</h2>
      {load ? (
        <>
          <div className="grid grid-cols-2">
            <span>No. Products</span>
            <span className="text-right">{totalItems} items</span>
            <span>Subtotal</span>
            <span className="text-right">{currencyFormatter(subtotal)}</span>
            <span>Taxes (%15)</span>
            <span className="text-right">{currencyFormatter(taxes)}</span>
            <span className="mt-5 text-xl font-medium">Total:</span>
            <span className="text-right mt-5 text-xl">
              {currencyFormatter(total)}
            </span>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center w-full h-28 bg-gray-200 rounded-md">
          <CgSpinner size={20} className="animate-spin" />
        </div>
      )}
      <div className="mt-5 w-full">
        <Link
          href="/checkout/address"
          className={cn(
            "flex justify-center btn-primary",
            !load && "opacity-70"
          )}
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};
