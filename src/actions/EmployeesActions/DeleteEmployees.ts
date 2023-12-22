"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";

export const DeleteEmployees = async (id: number) => {
  const user = await db.employee.findFirst({
    where: {
      id: id,
    },
  });
  if (!user) {
    return { status: 404, message: "Kullanıcı Bulunamadı" };
  }
  try {
    await db.employee.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/dashboard/employees");
    return { status: 200, message: "Kullanıcı Silindi" };
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};
