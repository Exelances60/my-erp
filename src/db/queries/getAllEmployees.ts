"use server";
import { Employee } from "@prisma/client";
import { cookies } from "next/headers";
import { cache } from "react";
import { db } from "@/db";

export type EmployeesResponse = {
  response: Employee[];
  totalAmount?: number;
  overAgreement: Employee[];
};

export const getAllEmployees = cache(async (): Promise<EmployeesResponse> => {
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

  const overAgreement = response.filter((employee) => {
    const currentDay = new Date();
    const agreementDate = new Date(employee.agreement);
    return currentDay > agreementDate;
  });

  return { response, totalAmount, overAgreement };
});
