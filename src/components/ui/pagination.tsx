"use client";

import { cn } from "@/libs/utils";
import { generatePagination } from "@/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  // Esto no tendria que hacercer porque siempre estamos recargando la pagina,
  // no es un elemento que cambie sin recargar y por eso no necesitamos un estado o un efecto;
  // const [pagination, setPagination] = useState<(number | string)[]>([]);

  // useEffect(() => {
  //   const generate = generatePagination(currentPage, totalPages);
  //   setPagination(generate);
  // }, [currentPage, totalPages]);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage =
    Number(searchParams.get("page")) === 0
      ? 1
      : Number(searchParams.get("page"));

  const pagination = generatePagination(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === "...") return `${pathname}?${params.toString()}`;
    if (+pageNumber <= 0) return `${pathname}`;
    if (+pageNumber > totalPages) return `${pathname}?${params.toString()}`;

    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center my-10">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item disabled">
            <Link
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage - 1)}
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>
          {pagination.map((page, i) => (
            <li className="page-item" key={i}>
              <Link
                className={cn(
                  "page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                  currentPage === page && "border-2 border-neutral-700/80"
                )}
                href={createPageUrl(page)}
              >
                {page}
              </Link>
            </li>
          ))}
          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
