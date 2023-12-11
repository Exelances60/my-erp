"use client";
import React, { useState } from "react";
import { Button, Drawer } from "antd";

interface DrawerProps {
  children: React.ReactNode;
  buttonName: string;
  title: string;
  danger?: boolean;
}

const DrawerComponent = ({
  children,
  buttonName,
  title,
  danger,
}: DrawerProps) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" danger={danger} onClick={showDrawer}>
        {buttonName}
      </Button>
      <Drawer title={title} placement="right" onClose={onClose} open={open}>
        {children}
      </Drawer>
    </>
  );
};

export default DrawerComponent;
