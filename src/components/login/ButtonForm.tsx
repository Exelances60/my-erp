import { Button } from "@nextui-org/react";
import React from "react";

const ButtonForm = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Button color="primary" type="submit" variant="shadow">
        {children}
      </Button>
    </>
  );
};

export default ButtonForm;
