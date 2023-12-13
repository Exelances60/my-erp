"use client";
import React from "react";
import ButtonForm from "@/components/login/ButtonForm";
import { useFormState } from "react-dom";
import { LoginFormAction } from "@/actions/LoginFormAction";
import { Input } from "antd";
import { Form } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const LoginForm = () => {
  const [formState, action] = useFormState(LoginFormAction, {
    errors: {},
  });
  return (
    <>
      <h3 className="text-xl font-bold text-center ">Giriş Yap</h3>
      <Form
        name="basic"
        layout="vertical"
        component={"form"}
        initialValues={{ remember: true }}
        onFinish={action}
      >
        <Form.Item
          name="email"
          hasFeedback
          validateStatus={formState?.errors?.email ? "error" : undefined}
          help={formState?.errors?.email}
          validateDebounce={1000}
          rules={[
            {
              required: true,
              message: "Lütfen email adresinizi giriniz!",
              type: "email",
            },
          ]}
        >
          <Input
            size="large"
            prefix={
              <MailOutlined
                className="site-form-item-icon"
                style={{ color: "gray" }}
              />
            }
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          validateStatus={formState?.errors?.password ? "error" : undefined}
          help={formState?.errors?.password}
          validateDebounce={1000}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Lütfen şifrenizi giriniz!",
            },
            {
              min: 6,
              message: "Şifreniz en az 6 karakter olmalıdır!",
            },
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Password"
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        {formState?.errors._form ? (
          <div className="border rounded-md bg-red-200 p-2 my-4">
            {formState?.errors._form}
          </div>
        ) : null}
        <Form.Item className="flex justify-center items-center">
          <ButtonForm color="success" size="lg">
            Giriş Yap
          </ButtonForm>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
