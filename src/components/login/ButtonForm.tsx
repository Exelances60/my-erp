"use client";
import React from "react";
import { Button } from "antd";

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
  icon,
  loading,
}: {
  children: React.ReactNode;
  color: ButtonColor;
  loading?: boolean;
  icon?: React.ReactNode;
}) => {
  return (
    <>
      <Button
        color={color}
        htmlType="submit"
        type="primary"
        size="large"
        loading={loading}
        className="bg-blue-500 hover:bg-blue-700"
        icon={icon}
      >
        {children}
      </Button>
    </>
  );
};

export default ButtonForm;
