import React from "react";
import ButtonForm from "../login/ButtonForm";
import { signOutAction } from "@/actions/SignOutAction";
import { LogoutOutlined } from "@ant-design/icons";
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
        <ButtonForm color={color} icon={<LogoutOutlined />}>
          Çıkış Yap
        </ButtonForm>
      </form>
    </>
  );
};
