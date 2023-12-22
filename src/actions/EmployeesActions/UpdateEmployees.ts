"use server";

import { db } from "@/db";
import { IFormDataEmployees } from "./CreateEmployees";
import { revalidatePath } from "next/cache";

export const UpdateEmployees = async (
  id: number,
  photoUrl: string,
  formData: IFormDataEmployees
) => {
  if (!formData) {
    return null;
  }
  if (!photoUrl) {
    try {
      console.log("no photo");
      return await db.employee.update({
        where: {
          id: id,
        },
        data: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          role: formData.Role,
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  try {
    await db.employee.update({
      where: {
        id: id,
      },
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        role: formData.Role,
      },
    });
    revalidatePath("/dashboard/employees");
  } catch (error: any) {
    throw new Error(error);
  }
};
