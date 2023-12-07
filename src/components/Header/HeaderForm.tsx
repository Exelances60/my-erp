import React from "react";
import ButtonForm from "../login/ButtonForm";
import { signOutAction } from "@/actions/SignOutAction";
import { LogoutIcon } from "@heroicons/react/outline";
export const HeaderForm = ({
  size,

  color,
}: {
  size?: "sm" | "md" | "lg";
  color?:
    | "danger"
    | "warning"
    | "success"
    | "secondary"
    | "primary"
    | "default";
}) => {
  return (
    <>
      <form action={signOutAction}>
        <ButtonForm
          color={color}
          size={size}
          icon={<LogoutIcon className="w-5 h-5" />}
        >
          Çıkış Yap
        </ButtonForm>
      </form>
    </>
  );
};
