"use server";

import prisma from "@/libs/prisma";

export const removeUserAddress = async (userId: string) => {
  try {
    const addressExists = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });

    if (addressExists) {
      await prisma.userAddress.delete({
        where: {
          userId,
        },
      });

      return {
        ok: true,
        message: "Address removed successfully ",
      };
    }

    return {
      ok: true,
      message: "Address was not saved",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Somethin went wrong",
    };
  }
};
