"use client";
import { message } from "antd";
import React from "react";

type ISetLoading = React.Dispatch<React.SetStateAction<boolean>>;

export const SuccesMessage = (
  messageT: string,
  succes?: boolean,
  setLoading?: ISetLoading
) => {
  if (succes) {
    message.success(messageT, 1);
    setLoading ? setLoading(false) : null;
    return (succes = false);
  }
};
