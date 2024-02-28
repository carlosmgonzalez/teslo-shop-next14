import { titleFont } from "@/config/fonts";
import Image from "next/image";
import Link from "next/link";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-[calc(100vh-150px)] w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5">
        <h2 className={`${titleFont.className} antialiased text-9xl`}>404</h2>
        <p className="font-semibold text-lg">Whoops! Lo sentimos mucho</p>
        <span>Puedes regresar al </span>
        <Link href="/" className="hover:underline font-semibold">
          inicio
        </Link>
      </div>
      <div>
        <Image
          src="/imgs/starman_750x750.png"
          alt="starman"
          className="p-5 sm:p-0"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};
