"use client";

import { useCart } from "@/store/cart.store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";

export const CartIcon = () => {
  const totalItemsInCart = useCart((state) => state.totalItemsInCart());
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
  }, []);

  return (
    <Link
      href={totalItemsInCart === 0 ? "/empty" : "/cart"}
      className="relative"
    >
      {load && totalItemsInCart > 0 && (
        <span
          className={`absolute -top-2 -right-1.5 px-0.5 bg-blue-700 rounded-full 
          flex items-center justify-center  w-4 text-white font-semibold text-xs `}
        >
          {totalItemsInCart}
        </span>
      )}
      <IoCartOutline className="h-5 w-5" />
    </Link>
  );
};
