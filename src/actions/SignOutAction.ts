"use server";
import { signOut } from "@/utils/firebase-utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signOutAction = async () => {
  try {
    const response = await signOut();
    await cookies().delete("uid");
  } catch (error: any) {
    throw new Error(error);
  }
  redirect("/");
};
