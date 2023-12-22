"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

interface IFormState {
  errors: {
    email?: string[];
    name?: string[];
    password?: string[];
    phone?: string[];
    Role?: string[];
    address?: string[];
    salary?: string[];
    _form?: string[];
    success?: boolean;
  };
}
export interface IFormDataEmployees {
  name: string;
  email: string;
  phone: string;
  Role: string;
  salary: string;
  address: string;
  dateTime: string;
}

const createEmployeesSchema = z.object({
  name: z.string().min(2, { message: "2 Karakterden fazla olmalı" }).max(255),
  email: z.string().email(),
  Role: z.string().min(2).max(255),
  address: z.string().min(2).max(255),
});

export const CreateEmployees = async (
  photoUrl: string,
  formState: IFormState,
  formData: IFormDataEmployees
): Promise<IFormState> => {
  const userUid = cookies().get("uid")?.value;
  const result = createEmployeesSchema.safeParse({
    name: formData.name,
    email: formData.email,
    Role: formData.Role,
    address: formData.address,
  });
  const { name, email, phone, Role, address, dateTime, salary } = formData;

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await db.employee.create({
      data: {
        name: name,
        email: email,
        phone: phone,
        address: address,
        salary: Number(salary),
        photoUrl:
          photoUrl === ""
            ? "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            : photoUrl,
        agreement: dateTime,
        userUid: userUid || "",
        role: Role,
      },
    });
    revalidatePath("/dashboard/employees");
    return {
      errors: {
        success: true,
      },
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    }
  }

  return {
    errors: {},
  };
};
