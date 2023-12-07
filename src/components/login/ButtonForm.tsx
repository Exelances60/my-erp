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
}: {
  children: React.ReactNode;
  color: ButtonColor;
}) => {
  const { pending } = useFormStatus();
  return (
    <>
      <Button color={color} type="submit" isLoading={pending} variant="shadow">
        {children}
      </Button>
    </>
  );
};

export default ButtonForm;
