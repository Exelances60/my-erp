"use server";

import { z } from "zod";

interface IFormState {
  errors: {
    email?: string[];
    name?: string[];
    password?: string[];
    phone?: string[];
    Role?: string[];
    address?: string[];
    _form?: string[];
    success?: string[];
  };
}
interface IFormData {
  name: string;
  email: string;
  phone: string;
  Role: string;
  address: string;
  dateTime: string[];
}

const createEmployeesSchema = z.object({
  name: z.string().min(2, { message: "2 Karakterden fazla olmalı" }).max(255),
  email: z.string().email(),
  phone: z.string().min(10, { message: "10 haneli olmalı" }).max(10),
  Role: z.string().min(2).max(255),
  address: z.string().min(2).max(255),
});

export const CreateEmployees = async (
  formState: IFormState,
  formData: IFormData
): Promise<IFormState> => {
  const result = createEmployeesSchema.safeParse({
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    Role: formData.Role,
    address: formData.address,
  });
  console.log(result);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  return {
    errors: {},
  };
};
