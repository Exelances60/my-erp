"use client";
import { fetchDashboardCardData } from "@/db/queries/getDashboardCardData";
import { renderIcon } from "@/hooks/renderIcon";
import { Button, Popconfirm } from "antd";
import React from "react";
import { message } from "antd";

interface DashboardCardDeleteProps {
  item: fetchDashboardCardData;
  deleteAction: () => void;
}

const DashboardCardDeleteComponent = ({
  item,
  deleteAction,
}: DashboardCardDeleteProps) => {
  const handleDelete = async () => {
    message.loading({ content: "Deleting card...", key: "delete" });
    const responseMessage = (await deleteAction()) as string | void;
    if (responseMessage) {
      message.success({ content: responseMessage, key: "delete" });
    }
  };
  return (
    <div key={item.id} className="flex w-full gap-2">
      {renderIcon(item.icon)}
      <Popconfirm
        title="Bu kartı silmek istediğinize emin misiniz?"
        okType="danger"
        onConfirm={() => {
          handleDelete();
        }}
        okText="Evet"
        cancelText="Hayır"
      >
        <Button type="primary" danger>
          {item.title}
        </Button>
      </Popconfirm>
    </div>
  );
};

export default DashboardCardDeleteComponent;
