"use client";
import React, { useState } from "react";
import { Button } from "antd";
import { Employee } from "@prisma/client";
import EmployeesPopoverForm from "./EmployeesPopoverForm";
import ModalComp from "../ModalComp";
import EmployeesDeleteActionPop from "./EmployeesDeleteActionPop";

interface IEmployeeActionPopoverProps {
  value: Employee;
}

const EmployeesActionPopover = ({ value }: IEmployeeActionPopoverProps) => {
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const openModal = () => {
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
    setDeleteVisible(false);
  };

  return (
    <div className="flex items-center box-border gap-2 p-2">
      <ModalComp
        title="Güncelle"
        visible={visible}
        closeModal={closeModal}
        onOk={closeModal}
      >
        <EmployeesPopoverForm value={value} />
      </ModalComp>

      <Button type="primary" ghost onClick={openModal}>
        Güncelle
      </Button>

      <EmployeesDeleteActionPop
        value={value}
        deleteVisible={deleteVisible}
        closeModal={closeModal}
      />

      <Button type="primary" danger onClick={() => setDeleteVisible(true)}>
        Sil
      </Button>
    </div>
  );
};

export default EmployeesActionPopover;
