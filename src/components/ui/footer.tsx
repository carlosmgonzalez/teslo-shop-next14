import { titleFont } from "@/config/fonts";
import { cn } from "@/libs/utils";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center text-xs mb-10">
      <Link href="/">
        <span className={cn(titleFont.className, "antialiased font-bold")}>
          Teslo
        </span>
        <span> | shop</span>
        <span>© {new Date().getFullYear()}</span>
      </Link>
      <p>
        This website was created by{" "}
        <a href="https://carlosgonzalez.info" className="underline">
          Carlos Mario Gonzalez
        </a>{" "}
        with the help of Fernando Herrera&apos;s course
      </p>
    </div>
  );
};
