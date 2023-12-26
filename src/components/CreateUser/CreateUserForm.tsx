"use client";
import React from "react";
import { useFormState } from "react-dom";
import { Button, Form, Input, Select, message } from "antd";
import { renderIcon } from "@/hooks/renderIcon";
import ButtonForm from "../login/ButtonForm";
import { CreateAddUser } from "@/actions/CreateUser/CreateAddUser";

const CreateUserForm = () => {
  const [formState, action] = useFormState(CreateAddUser, {
    stateManaget: {},
  });

  if (formState?.stateManaget?.succes) {
    message.success("Kullanıcı başarıyla oluşturuldu!");
    formState.stateManaget.succes = false;
  }
  return (
    <>
      <Form className="w-[50%] flex flex-col" onFinish={action}>
        <Form.Item
          name="email"
          className="w-full"
          validateDebounce={1000}
          validateStatus={formState?.stateManaget?.email ? "error" : undefined}
          help={formState?.stateManaget?.email}
          rules={[
            { required: true, message: "Lütfen email giriniz!", type: "email" },
          ]}
        >
          <Input
            size="large"
            name="email"
            placeholder="Email giriniz"
            prefix={renderIcon("Mail")}
          />
        </Form.Item>

        <Form.Item
          name="name"
          className="w-full"
          validateStatus={formState?.stateManaget?.name ? "error" : undefined}
          help={formState?.stateManaget?.name}
          rules={[{ required: true, message: "Lütfen name giriniz!" }]}
        >
          <Input
            size="large"
            name="name"
            placeholder="Name giriniz"
            prefix={renderIcon("User")}
          />
        </Form.Item>

        <Form.Item
          name="password"
          className="w-full"
          rules={[
            { required: true, message: "Lütfen password giriniz!", min: 2 },
          ]}
        >
          <Input.Password
            size="large"
            name="password"
            placeholder="Şifre giriniz"
            prefix={renderIcon("LockClosed")}
          />
        </Form.Item>

        <Form.Item
          name="role"
          className="w-full"
          rules={[{ required: true, message: "Lütfen role giriniz!" }]}
        >
          <Select
            size="large"
            placeholder="Yetkisini Giriniz"
            options={[
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" },
            ]}
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

export default CreateUserForm;
