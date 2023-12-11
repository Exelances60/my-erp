"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface DashboardCardAddStateProps {
  errors: {
    _form?: string[];
  };
}
export const DashboardCardAddAction = async (
  value: string,
  formState: DashboardCardAddStateProps,
  formData: any
): Promise<DashboardCardAddStateProps> => {
  const path = value;
  const { title, mainText, icon } = formData;
  const userUid = cookies().get("uid")?.value;
  console.log(path);

  if (!userUid) {
    return {
      errors: {
        _form: ["User not logged in"],
      },
    };
  }

  try {
    await db.dashboardCard.create({
      data: {
        title: title || "",
        mainText: mainText || "",
        path: path || "",
        icon: icon || "",
        userUid: userUid || "",
      },
    });
  } catch (error: any) {
    if (error.response) {
      return {
        errors: {
          _form: [error.response.data.message],
        },
      };
    }
  }

  revalidatePath("/dashboard");
  return {
    errors: {},
  };
};
