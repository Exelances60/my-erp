"use client";
import React from "react";
import ButtonForm from "@/components/login/ButtonForm";
import { iconOptions, renderIcon } from "@/hooks/renderIcon";
import { Button, Form, Input, Select, message } from "antd";
import { useFormState } from "react-dom";
import { NavMenuCreateAction } from "@/actions/NavMenuCreateAction";

const CreateMenuForm = () => {
  const [formState, action] = useFormState(NavMenuCreateAction, {
    stateManaget: {},
  });

  if (formState.stateManaget.succes) {
    message.success("Başarıyla oluşturuldu", 1);
    formState.stateManaget.succes = false;
  }

  return (
    <>
      <Form className="w-[50%] flex flex-col" onFinish={action}>
        <Form.Item
          name="key"
          className="w-full"
          rules={[{ required: true, message: "Lütfen key giriniz!", min: 2 }]}
        >
          <Input
            size="large"
            name="key"
            placeholder="Anahtar giriniz"
            prefix={renderIcon("Key")}
          />
        </Form.Item>

        <Form.Item
          name="title"
          className="w-full"
          rules={[{ required: true, message: "Lütfen title giriniz!", min: 2 }]}
        >
          <Input
            size="large"
            name="title"
            placeholder="Başlık giriniz"
            prefix={renderIcon("Pencil")}
          />
        </Form.Item>

        <Form.Item
          name="icon"
          className="w-full"
          rules={[{ required: true, message: "Lütfen icon giriniz!" }]}
        >
          <Select
            size="large"
            placeholder="Menü Logosu Seçiniz"
            options={iconOptions}
            optionRender={(item) => (
              <div className="flex items-center justify-between gap-1">
                {item.data.icon}
                <span>{item.label}</span>
              </div>
            )}
          />
        </Form.Item>

        <Form.Item
          name="seeRoles"
          className="w-full"
          rules={[{ required: true, message: "Lütfen role giriniz!" }]}
        >
          <Select
            size="large"
            placeholder="Görüntüleme yetkisi"
            options={[
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="url"
          className="w-full"
          rules={[
            {
              required: true,
              message: "Lütfen url giriniz!",
            },
          ]}
        >
          <Input
            size="large"
            name="url"
            placeholder="Url giriniz"
            prefix={renderIcon("Link")}
          />
        </Form.Item>

        {formState.stateManaget._form ? (
          <div className="border rounded-md bg-red-200 p-2 my-4">
            {formState.stateManaget._form}
          </div>
        ) : null}

        <ButtonForm color="danger">Oluştur</ButtonForm>

        <Button htmlType="reset" size="large" className="mt-5">
          Reset
        </Button>
      </Form>
    </>
  );
};

export default CreateMenuForm;
