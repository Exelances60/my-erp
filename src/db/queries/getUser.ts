"use server";
import { db } from "@/db";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import { cache } from "react";

export type fetchUserType = User | null;

export const fetchUser = cache(async (): Promise<fetchUserType> => {
  const uid = await cookies().get("uid");
  console.log("fetchUser");
  try {
    return await db.user.findFirst({
      where: {
        uid: uid?.value,
      },
    });
  } catch (error: any) {
    throw new Error(error);
  }
});
