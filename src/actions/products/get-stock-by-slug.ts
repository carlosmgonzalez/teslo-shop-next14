"use server";

import prisma from "@/libs/prisma";
// import { sleep } from "@/utils/sleep";

export const getStockBySlug = async (slug: string) => {
  try {
    const stock = await prisma.product.findUnique({
      where: {
        slug,
      },
      select: {
        inStock: true,
      },
    });

    // await sleep(5);

    if (!stock) return { error: "stock not found" };

    return { success: { stock: stock.inStock } };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
