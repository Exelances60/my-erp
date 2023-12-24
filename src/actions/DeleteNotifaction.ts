"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";

export const DeleteNotifaction = async (notifactionId: number) => {
  const notifaction = await db.notification.findFirst({
    where: {
      id: notifactionId,
    },
  });
  if (!notifaction) {
    return { status: 404, message: "Bildirim Bulunamadı" };
  }
  try {
    await db.notification.delete({
      where: {
        id: notifactionId,
      },
    });
    revalidatePath("/dashboard/notifactions");
    return { status: 200, message: "Bildirim Silindi" };
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};
