"use client";

import { cn } from "@/libs/utils";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  setQuantity: (value: number) => void;
  size?: number;
}

export const QuantitySelector = ({ quantity, setQuantity, size }: Props) => {
  const onQuantityChange = (value: number) => {
    if (quantity + value === 0) return;
    setQuantity(quantity + value);
  };

  return (
    <div className="flex gap-2 items-center">
      <button onClick={() => onQuantityChange(-1)}>
        <IoRemoveCircleOutline size={size || 30} />
      </button>
      <span
        className={cn(
          "bg-gray-200/80 text-center rounded",
          size ? "px-4 text-sm" : "px-5"
        )}
      >
        {quantity}
      </span>
      <button onClick={() => onQuantityChange(+1)}>
        <IoAddCircleOutline size={size || 30} />
      </button>
    </div>
  );
};
