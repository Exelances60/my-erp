"use server";

import { db } from "@/db";

export const DashboardCardAction = async (
  title?: string,
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
};
