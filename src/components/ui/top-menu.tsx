import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { ButtonMenu } from "./button-menu";
import { CartIcon } from "./cart-icon";

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
          href="/gender/men"
          className="m-2 px-2 py-1 rounded-md transition-all hover:bg-gray-100"
        >
          Men
        </Link>
        <Link
          href="/gender/women"
          className="m-2 px-2 py-1 rounded-md transition-all hover:bg-gray-100"
        >
          Women
        </Link>
        <Link
          href="/gender/kid"
          className="m-2 px-2 py-1 rounded-md transition-all hover:bg-gray-100"
        >
          Kids
        </Link>
      </div>

      <div className="flex items-center space-x-3">
        <Link href="/search">
          <IoSearchOutline className="h-5 w-5" />
        </Link>
        <CartIcon />
        <ButtonMenu />
      </div>
    </nav>
  );
};
