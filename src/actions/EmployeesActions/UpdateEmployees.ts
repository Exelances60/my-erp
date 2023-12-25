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
      await db.employee.update({
        where: {
          id: id,
        },
        data: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          salary: Number(formData.salary),
          agreement: formData.dateTime,
          address: formData.address,
          role: formData.Role,
        },
      });
      revalidatePath("/dashboard/employees");
      return { status: 200 };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  try {
    console.log("photo");
    await db.employee.update({
      where: {
        id: id,
      },
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        photoUrl: photoUrl,
        agreement: formData.dateTime,
        salary: Number(formData.salary),
        address: formData.address,
        role: formData.Role,
      },
    });
    revalidatePath("/dashboard/employees");
    return { status: 200 };
  } catch (error: any) {
    throw new Error(error);
  }
};
