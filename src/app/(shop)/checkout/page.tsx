import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Check your order" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col">
            <span className="text-xl">Your order</span>
            <Link href="/cart" className="underline mb-5">
              Edit
            </Link>
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
          <div className="bg-white bg-ne rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Delivery address</h2>
            <div>
              <p>Carlos Gonzalez</p>
              <p>Av. Rodriguez Peña</p>
              <p>Buenos Aire - CABA</p>
              <p>CP: 1020</p>
            </div>
            <div className="w-full h-0.5 rounded bg-gray-200 my-6" />
            <h2 className="text-2xl mb-2">Order summary</h2>
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
              <span className="text-xs">
                By clicking &quotconfirm&quot you accept our
                <a href="/termsandcondition" className="underline">
                  terms and conditions
                </a>{" "}
                and{" "}
                <a href="/privacypolicy" className="underlina">
                  privacy policy
                </a>
              </span>
              <Link
                href="/orders/123"
                className="flex justify-center btn-primary mt-2"
              >
                Confirm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
