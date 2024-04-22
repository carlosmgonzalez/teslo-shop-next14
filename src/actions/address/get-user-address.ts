"use server";

import prisma from "@/libs/prisma";

export const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({
      where: { userId },
    });

    return address;
  } catch (error) {
    console.log(error);
    return null;
  }
};
