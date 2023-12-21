"use server";
import { Employee } from "@prisma/client";
import { cookies } from "next/headers";
import { db } from "@/db";

type EmployeesResponse = {
  response: Employee[];
  totalAmount: number;
};

export const getAllEmployees = async (): Promise<EmployeesResponse> => {
  const userUid = cookies().get("uid")?.value;
  if (!userUid) {
    throw new Error("No user uid found");
  }
  const response = await db.employee.findMany({
    where: {
      userUid,
    },
  });
  const totalAmount = response.reduce((acc, curr) => {
    return acc + curr.salary;
  }, 0);

  return { response, totalAmount };
};
