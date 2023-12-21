"use client";
import { message } from "antd";

export const SuccesMessage = (messageT: string, succes?: boolean) => {
  if (succes) {
    message.success(messageT, 1);
    return (succes = false);
  }
};
