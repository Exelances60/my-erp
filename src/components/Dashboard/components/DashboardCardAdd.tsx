"use client";
import { DashboardCardAddAction } from "@/actions/DashboardAction/DashboardCardAddAction";
import { MenuListType } from "@/db/queries/getMenuList";
import { iconOptions } from "@/hooks/renderIcon";
import { Button, Form, Input, Select, message } from "antd";
import React, { useState } from "react";
import { useFormState } from "react-dom";

interface IDashboardCardAdd {
  menuList: MenuListType;
}

const DashboardCardAdd = ({ menuList }: IDashboardCardAdd) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const formItems = [
    {
      label: "Açıklama",
      name: "mainText",
      rules: [{ required: true, message: "Lütfen açıklama giriniz!" }],
    },
  ];
  const [formState, action] = useFormState(
    DashboardCardAddAction.bind(null, value),
    {
      errors: {},
    }
  );
  if (formState?.errors.success) {
    message.success("Kart Başarıyla Eklendi", 1);
    setLoading ? setLoading(false) : null;
    return (formState.errors.success = false);
  }

  const menuTree = menuList?.map((item) => {
    return {
      label: item.title,
      value: item.title,
      url: item.url,
    };
  });

  return (
    <div className="flex flex-col justify-center  items-center ">
      <Form
        name="addDashboardCard"
        layout="vertical"
        className="w-full"
        onFinish={(payload) => {
          action(payload);
          setLoading(true);
        }}
      >
        <Form.Item name="title" label="Menü" className="w-full">
          <Select
            size="large"
            placeholder="Menü Seçiniz"
            options={menuTree}
            optionRender={(item) => (
              <div
                className="flex items-center justify-between gap-1"
                onClick={() => {
                  setValue(item.data.url);
                }}
              >
                <span>{item.label}</span>
              </div>
            )}
          />
        </Form.Item>

        {formItems.map((item) => {
          return (
            <Form.Item
              key={item.name}
              label={item.label}
              className="w-full"
              name={item.name}
              rules={item.rules}
            >
              <Input name={item.name} size="large" />
            </Form.Item>
          );
        })}

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

        <Form.Item className="flex justify-center items-center  ">
          <Button htmlType="submit" className="mr-2" loading={loading}>
            Ekle
          </Button>
          <Button htmlType="reset">Reset</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DashboardCardAdd;
