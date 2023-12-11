"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";

export const DashboardCardDelete = async (id: string): Promise<String> => {
  try {
    const response = await db.dashboardCard.findFirst({
      where: {
        id: id,
      },
    });
    if (!response) return "Dashboard card not found";

    await db.dashboardCard.delete({
      where: {
        id: id,
      },
    });
  } catch (error: any) {
    console.error("DashboardCardDelete", error);
    return `Error deleting dashboard card: ${error.message || error}`;
  }
  revalidatePath("/dashboard");
  return "Başarıyla silindi";
};
