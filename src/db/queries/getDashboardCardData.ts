"use server";
import { db } from "@/db";
import { cookies } from "next/headers";
import { cache } from "react";

export type fetchDashboardCardData = {
  id: string;
  userUid: string;
  title: string;
  mainText: string;
  icon: string;
  path: string;
  createdAt: Date;
  updatedAt: Date;
};

export const getDashboardCardData = cache(
  async (): Promise<fetchDashboardCardData[]> => {
    const userCokie = await cookies().get("uid")?.value;
    return await db.dashboardCard.findMany({
      where: {
        userUid: userCokie,
      },
    });
  }
);
