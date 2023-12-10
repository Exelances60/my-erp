"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";

export const DashboardCardDelete = async (id: string) => {
  try {
    await db.dashboardCard.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error("DashboardCardDelete", error);
    return error;
  }
  revalidatePath("/dashboard");
};
