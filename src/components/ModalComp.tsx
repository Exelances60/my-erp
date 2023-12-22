import React from "react";
import { Modal } from "antd";

interface IModalCompProps {
  closeModal: () => void;
  visible: boolean;
  title: string;
  children: React.ReactNode;
  onOk: () => void;
}

const ModalComp = ({
  closeModal,
  visible,
  title,
  children,
  onOk,
}: IModalCompProps) => {
  return (
    <>
      <Modal
        title={title}
        open={visible}
        onOk={() => {
          onOk();
        }}
        onCancel={() => {
          closeModal();
        }}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalComp;
