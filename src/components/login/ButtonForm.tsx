"use client";
import { Button } from "@nextui-org/react";
import React from "react";
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
        type="submit"
        size={size}
        isLoading={pending}
        variant="shadow"
        startContent={icon}
      >
        {children}
      </Button>
    </>
  );
};

export default ButtonForm;
