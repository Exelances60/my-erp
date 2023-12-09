"use server";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

export const DashboardCardAction = async (
  mainText?: string,
  uniqueKey?: string
) => {
  await db.dashboardCard.update({
    where: {
      id: uniqueKey,
    },
    data: {
      mainText,
    },
  });
  revalidatePath("/dashboard");
};

export const DashboardCardTitleAction = async (
  title?: string,
  uniqueKey?: string
) => {
  await db.dashboardCard.update({
    where: {
      id: uniqueKey,
    },
    data: {
      title,
    },
  });
  revalidatePath("/dashboard");
};
