import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { ButtonMenu } from "./button-menu";

export const TopMenu = () => {
  return (
    <nav className="flex px-5 justify-between items-center w-full">
      <div>
        <Link href="/">
          <span className={`${titleFont.className} font-semibold`}>Teslo</span>
          <span> | Shop</span>
        </Link>
      </div>

      <div className="hidden sm:flex">
        <Link
          href="/category/men"
          className="m-2 px-2 py-1 rounded-md transition-all hover:bg-gray-100"
        >
          Men
        </Link>
        <Link
          href="/category/women"
          className="m-2 px-2 py-1 rounded-md transition-all hover:bg-gray-100"
        >
          Women
        </Link>
        <Link
          href="/category/kids"
          className="m-2 px-2 py-1 rounded-md transition-all hover:bg-gray-100"
        >
          Kids
        </Link>
      </div>

      <div className="flex items-center space-x-3">
        <Link href="/search">
          <IoSearchOutline className="h-5 w-5" />
        </Link>
        <Link href="/cart" className="relative">
          <span
            className={`absolute -top-2 -right-1.5 px-0.5 bg-blue-700 rounded-full 
            flex items-center justify-center  w-4 text-white font-semibold text-xs `}
          >
            1
          </span>
          <IoCartOutline className="h-5 w-5" />
        </Link>
        <ButtonMenu />
      </div>
    </nav>
  );
};
