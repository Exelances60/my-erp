import { Button } from "@nextui-org/react";
import React from "react";

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
  return (
    <>
      <Button color={color} type="submit" variant="shadow">
        {children}
      </Button>
    </>
  );
};

export default ButtonForm;
