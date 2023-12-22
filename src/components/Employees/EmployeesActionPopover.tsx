"use client";
import React, { useState } from "react";
import { Button, message } from "antd";
import { Employee } from "@prisma/client";
import EmployeesPopoverForm from "./EmployeesPopoverForm";
import ModalComp from "../ModalComp";
import { DeleteEmployees } from "@/actions/EmployeesActions/DeleteEmployees";
import Image from "next/image";

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

  const handleDelete = async () => {
    const response = await DeleteEmployees(value.id);
    if (response?.status === 400) {
      return message.error(response.message);
    }
    if (response?.status === 200) {
      message.success(response.message);
    }
    if (response?.status === 500) {
      return message.error(response.message);
    }
    closeModal();
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

      <ModalComp
        title="Sil"
        visible={deleteVisible}
        closeModal={closeModal}
        onOk={handleDelete}
      >
        <div className="text-center">
          <div className="flex items-center gap-2 p-4 box-border justify-center w-full">
            <Image
              src={value.photoUrl || "/images/placeholder.png"}
              width={300}
              height={300}
              alt="Personel fotograf"
            />
          </div>
          <p>
            <span className="text-red-500"> {value.name} </span> isimli çalışanı
            silmek istediğinize emin misiniz?
          </p>
          <p>
            <span className="text-gray-500">Email : </span> {value.email}
          </p>
        </div>
      </ModalComp>

      <Button type="primary" danger onClick={() => setDeleteVisible(true)}>
        Sil
      </Button>
    </div>
  );
};

export default EmployeesActionPopover;
