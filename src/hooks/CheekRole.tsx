"use client";
import { selectUser, useUserStore } from "@/store/userStore";
import React from "react";

interface ICheekRoleProps {
  role: string[];
  children: React.ReactNode;
}

const CheekRole = ({ role, children }: ICheekRoleProps) => {
  const user = useUserStore(selectUser);
  const hasRole = role.find((item) => item === user?.role);

  return hasRole ? <>{children}</> : null;
};

export default CheekRole;
