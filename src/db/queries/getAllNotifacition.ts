"use server";

import { Notification } from "@prisma/client";
import { cookies } from "next/headers";
import { db } from "@/db";
import { cache } from "react";

export type NotificationResponse = {
  response: Notification[];
  totalAmount?: number;
};

export const getAllNotification = cache(
  async (): Promise<NotificationResponse> => {
    const userUid = cookies().get("uid")?.value;
    if (!userUid) {
      throw new Error("No user uid found");
    }
    const response = await db.notification.findMany({
      where: {
        userUid,
      },
    });

    return {
      response,
    };
  }
);
