"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";

interface NavMenuCreateState {
  stateManaget: {
    key?: string[];
    title?: string[];
    url?: string[];
    _form?: string[];
    succes?: boolean;
  };
}

export const NavMenuCreateAction = async (
  formState: NavMenuCreateState,
  formData: {
    key: string;
    title: string;
    url: string;
    icon: string;
    seeRoles: string;
  }
): Promise<NavMenuCreateState> => {
  const { key, title, url, icon, seeRoles } = formData;
  try {
    const menu = await db.navMenu.findFirst({
      where: {
        key: formData.key,
      },
    });
    if (menu) {
      return {
        stateManaget: {
          key: ["Bu key daha önce kullanılmış"],
        },
      };
    }
    await db.navMenu.create({
      data: {
        key,
        title,
        url,
        icon,
        seeRoles: `{${seeRoles}}`,
      },
    });
  } catch (error: unknown) {
    return {
      stateManaget: {
        _form: [(error as Error).message],
      },
    };
  }
  revalidatePath("/dashboard/createMenu");
  return {
    stateManaget: {
      succes: true,
    },
  };
};
