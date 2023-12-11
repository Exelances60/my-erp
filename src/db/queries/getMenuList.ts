"use server";

import { db } from "@/db";
import { NavMenu } from "@prisma/client";
import { cache } from "react";

export type MenuListType = NavMenu[] | null;

export const fetchMenuList = cache(
  async (userRole?: string): Promise<MenuListType> => {
    if (!userRole) return null;
    try {
      return await db.navMenu.findMany({
        where: {
          seeRoles: userRole,
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
