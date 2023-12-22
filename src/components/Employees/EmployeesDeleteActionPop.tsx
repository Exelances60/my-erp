import React from "react";
import { message } from "antd";
import { Employee } from "@prisma/client";
import ModalComp from "../ModalComp";
import Image from "next/image";
import { DeleteEmployees } from "@/actions/EmployeesActions/DeleteEmployees";

interface IEmployeeActionPopoverProps {
  value: Employee;
  deleteVisible: boolean;
  closeModal: () => void;
}

const EmployeesDeleteActionPop = ({
  value,
  deleteVisible,
  closeModal,
}: IEmployeeActionPopoverProps) => {
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
    <>
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
    </>
  );
};

export default EmployeesDeleteActionPop;
