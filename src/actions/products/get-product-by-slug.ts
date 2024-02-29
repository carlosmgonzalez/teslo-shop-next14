"use server";

import prisma from "@/libs/prisma";

export const getProductBySlug = async (slug: string) => {
  try {
    const productDB = await prisma.product.findUnique({
      where: {
        slug,
      },
      include: {
        productImage: {
          select: {
            url: true,
          },
        },
      },
    });

    if (!productDB) return { error: "Product not found" };

    return {
      success: {
        product: {
          ...productDB,
          images: productDB.productImage.map((image) => image.url),
        },
      },
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
