import type { Size } from "@/interfaces";
import { cn } from "@/libs/utils";

interface Props {
  selectedSize?: Size;
  availableSize: Size[];
}

export const SizeSelector = ({ availableSize, selectedSize }: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Size</h3>
      <div className="flex gap-2">
        {availableSize.map((size) => (
          <button
            key={size}
            className={cn(
              "rounded px-2 py-1.5 bg-neutral-200/70 hover:bg-neutral-300",
              selectedSize === size && "border-2 border-blue-700"
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
