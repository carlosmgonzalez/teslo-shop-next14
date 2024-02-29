"use client";

import { getStockBySlug } from "@/actions/products/get-stock-by-slug";
import { titleFont } from "@/config/fonts";
import { cn } from "@/libs/utils";
import { useEffect, useState, useTransition } from "react";
import { CgSpinner } from "react-icons/cg";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState<number>();
  const [isLoading, SetIsLoading] = useState<boolean>(true);

  useEffect(() => {
    SetIsLoading(true);
    getStockBySlug(slug)
      .then((data) => {
        if (data.success) {
          setStock(data.success.stock);
        }
      })
      .finally(() => SetIsLoading(false));
  }, [slug]);

  return (
    <h1
      className={cn(
        titleFont.className,
        "antialiased font-semibold text-lg flex items-center gap-1"
      )}
    >
      Stock:
      <span>
        {isLoading ? <CgSpinner size={20} className="animate-spin" /> : stock}
      </span>
    </h1>
  );
};
