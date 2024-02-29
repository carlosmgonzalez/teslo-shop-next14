import { Size } from "@/interfaces";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface ProductInCart {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  size: Size;
  image: string;
}

export interface Cart {
  cart: ProductInCart[];
  totalItemsInCart: () => number;
  getSummaryInfo: () => {
    total: number;
    subtotal: number;
    taxes: number;
    totalItems: number;
  };
  addProductToCart: (product: ProductInCart) => void;
  deleteProductToCart: (product: ProductInCart) => void;
  setQuantityProductToCart: (
    product: ProductInCart,
    newQuantity: number
  ) => void;
}

export const useCart = create<Cart>()(
  persist(
    (set, get) => ({
      cart: [],
      totalItemsInCart: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      getSummaryInfo: () => {
        const { cart, totalItemsInCart } = get();
        const subtotal = cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        const taxes = subtotal * 0.15;
        const total = subtotal + taxes;
        const totalItems = totalItemsInCart();

        return {
          total,
          subtotal,
          taxes,
          totalItems,
        };
      },
      addProductToCart: (newProduct) =>
        set((state) => {
          if (
            state.cart.find(
              (product) =>
                product.id === newProduct.id && product.size === newProduct.size
            )
          ) {
            return {
              cart: state.cart.map((product) =>
                product.id === newProduct.id && product.size === newProduct.size
                  ? {
                      ...product,
                      quantity: product.quantity + newProduct.quantity,
                    }
                  : product
              ),
            };
          }
          return {
            cart: [...state.cart, newProduct],
          };
        }),
      deleteProductToCart: (productBeRemove) => {
        set((state) => {
          return {
            cart: state.cart.filter(
              (product) =>
                !(
                  product.id === productBeRemove.id &&
                  product.size === productBeRemove.size
                )
            ),
          };
        });
      },
      setQuantityProductToCart: (productToUpdate, newQuantity) =>
        set((state) => ({
          cart: state.cart.map((product) => {
            if (
              !!(
                product.id === productToUpdate.id &&
                product.size === productToUpdate.size
              )
            ) {
              return {
                ...productToUpdate,
                quantity: newQuantity,
              };
            }
            return product;
          }),
        })),
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
