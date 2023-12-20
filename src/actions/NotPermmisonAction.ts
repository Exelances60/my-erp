"use server";

import { redirect } from "next/navigation";

export const NotPermmisonAction = () => {
  redirect("/dashboard");
};
