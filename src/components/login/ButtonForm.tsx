"use client";
import React from "react";
import { Button } from "antd";
import { useFormStatus } from "react-dom";

type ButtonColor =
  | "danger"
  | "warning"
  | "success"
  | "secondary"
  | "primary"
  | "default"
  | undefined;

const ButtonForm = ({
  children,
  color,
  size,
  icon,
}: {
  children: React.ReactNode;
  color: ButtonColor;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}) => {
  const { pending } = useFormStatus();

  return (
    <>
      <Button
        color={color}
        htmlType="submit"
        type="primary"
        size="large"
        className="bg-blue-500 hover:bg-blue-700"
        loading={pending}
        icon={icon}
      >
        {children}
      </Button>
    </>
  );
};

export default ButtonForm;
