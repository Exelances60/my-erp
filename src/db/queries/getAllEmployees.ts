"use server";
import { Employee } from "@prisma/client";
import { cookies } from "next/headers";
import { cache } from "react";
import { db } from "@/db";

export type EmployeesResponse = {
  response: Employee[];
  totalAmount?: number;
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

    return agreementDate < currentDay;
  });

  if (overAgreement.length > 0) {
    const allReadyExistNotifaction = await db.notification.findMany({
      where: {
        userUid,
      },
    });

    try {
      overAgreement.forEach(async (employee) => {
        if (
          !allReadyExistNotifaction.find(
            (notification) => notification.EmployeeId === employee.id
          )
        ) {
          await db.notification.create({
            data: {
              EmployeeId: employee.id,
              userUid,
              photoUrl: employee.photoUrl,
              title: "Çalışanın sözleşmesi bitmiş",
              message: `ID : ${employee.id}  ${employee.name}  ${employee.email} çalışanının sözleşmesi bitmiş`,
            },
          });
        }
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  return { response, totalAmount };
});

export const calculatePrevMonthPercents = (
  response: Employee[],
  totalAmount: number
) => {
  const currentMonth = new Date().getMonth();
  const prevMountAmount = response
    .filter((employee) => {
      return employee.createdAt.getMonth() < currentMonth;
    })
    .reduce((acc, curr) => {
      return acc + curr.salary;
    }, 0);

  const percentageIncrease = (
    ((totalAmount - prevMountAmount) / prevMountAmount) *
    100
  ).toFixed(2);

  return { percentageIncrease, prevMountAmount };
};

export const calculatePrevMonthEmployees = (response: Employee[]) => {
  const currentMonth = new Date().getMonth();
  const prevMountAmountEmployee = response.filter((employee) => {
    return employee.createdAt.getMonth() < currentMonth;
  }).length;

  const percentIncreaseEmployeeNumber = (
    ((response.length - prevMountAmountEmployee) / prevMountAmountEmployee) *
    100
  ).toFixed(2);

  return { percentIncreaseEmployeeNumber, prevMountAmountEmployee };
};
