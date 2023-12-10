"use client";
import { DashboardCardAddAction } from "@/actions/DashboardCardAddAction";
import ButtonForm from "@/components/login/ButtonForm";
import { iconOptions } from "@/hooks/renderIcon";
import { Form, Input, Select } from "antd";
import React from "react";
import { useFormState } from "react-dom";

const formItems = [
  {
    label: "Başlık",
    name: "title",
    rules: [{ required: true, message: "Lütfen başlık giriniz!" }],
  },
  {
    label: "Açıklama",
    name: "mainText",
    rules: [{ required: true, message: "Lütfen açıklama giriniz!" }],
  },
  {
    label: "Link",
    name: "path",
    rules: [{ required: true, message: "Lütfen path giriniz!" }],
  },
];

const DashboardCardAdd = () => {
  const [formState, action] = useFormState(DashboardCardAddAction, {
    errors: {},
  });

  return (
    <div className="flex flex-col justify-center items-center ">
      <Form
        name="addDashboardCard"
        layout="vertical"
        size="large"
        onFinish={action}
      >
        {formItems.map((item) => (
          <Form.Item
            key={item.name}
            label={item.label}
            className="w-full"
            name={item.name}
            rules={item.rules}
          >
            <Input name={item.name} size="large" />
          </Form.Item>
        ))}
        <Form.Item
          label="İkon"
          className="w-full"
          name="icon"
          rules={[{ required: true, message: "Lütfen icon giriniz!" }]}
        >
          <Select
            size="large"
            options={iconOptions}
            optionRender={(item) => (
              <div className="flex items-center justify-between gap-1">
                {item.data.icon}
                <span>{item.label}</span>
              </div>
            )}
          />
        </Form.Item>
        {formState?.errors._form ? (
          <div className="border rounded-md bg-red-200 p-2 my-4">
            {formState?.errors._form}
          </div>
        ) : null}
        <Form.Item className="flex justify-center items-center">
          <ButtonForm color="success" size="lg">
            Kart Ekle
          </ButtonForm>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DashboardCardAdd;
