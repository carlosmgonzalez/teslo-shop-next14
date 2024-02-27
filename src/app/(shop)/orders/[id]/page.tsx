import { QuantitySelector, Title } from "@/components";
import { cn } from "@/libs/utils";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: {
    id: string;
  };
}

export default function OrderPage({ params }: Props) {
  const { id } = params;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`No. ${id} Order`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col">
            <div
              className={cn(
                "w-full flex items-center rounded-lg py-2 px-3.5 text-sm font-bold text-white mb-5",
                false && "bg-red-500",
                true && "bg-green-500"
              )}
            >
              <IoCartOutline size={30} />
              <span>Pending payment</span>
            </div>
            <div className="flex flex-col gap-4">
              {productsInCart.map((product) => (
                <div key={product.slug} className="flex">
                  <Image
                    src={`/products/${product.images[0]}`}
                    width={150}
                    height={100}
                    alt={product.title}
                    className="rounded mr-5 aspect-auto"
                  />
                  <div>
                    <p className="font-medium">{product.title}</p>
                    <p>${product.price} x3</p>
                    <p className="font-medium">
                      Subtotal: ${product.price * 3}
                    </p>
                    <button className="underline mb-3">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full">
            <div className="bg-white bg-ne rounded-xl shadow-xl p-7">
              <h2 className="text-2xl mb-1">Delivery address</h2>
              <div>
                <p>Carlos Gonzalez</p>
                <p>Av. Rodriguez Peña</p>
                <p>Buenos Aire - CABA</p>
                <p>CP: 1020</p>
              </div>
              <div className="w-full h-0.5 rounded bg-gray-200 my-6" />
              <h2 className="text-2xl mb-1">Order summary</h2>
              <div className="grid grid-cols-2">
                <span>No. Products</span>
                <span className="text-right">3</span>
                <span>Subtotal</span>
                <span className="text-right">$100</span>
                <span>Taxes (%15)</span>
                <span className="text-right">$100</span>
                <span>Taxes</span>
                <span className="text-right">$100</span>
                <span className="mt-5 text-xl font-medium">Total:</span>
                <span className="text-right mt-5 text-xl">$100</span>
              </div>
              <div className="mt-5 w-full">
                <div
                  className={cn(
                    "w-full flex items-center rounded-lg py-2 px-3.5 text-sm font-bold text-white mb-5",
                    false && "bg-red-500",
                    true && "bg-green-500"
                  )}
                >
                  <IoCartOutline size={30} />
                  <span>Pending payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
