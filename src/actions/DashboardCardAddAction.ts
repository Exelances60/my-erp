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
  formState: DashboardCardAddStateProps,
  formData: any
): Promise<DashboardCardAddStateProps> => {
  const { title, mainText, path, icon } = formData;
  const userUid = cookies().get("uid")?.value;

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
      if (error.response.status === 422) {
        return {
          errors: error.response.data.errors,
        };
      }
    }
  }
  revalidatePath("/dashboard");
  return {
    errors: {},
  };
};
