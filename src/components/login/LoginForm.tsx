"use client";
import React from "react";
import ButtonForm from "@/components/login/ButtonForm";
import { Divider, Input } from "@nextui-org/react";
import { useFormState } from "react-dom";
import { LoginFormAction } from "@/actions/LoginFormAction";

const LoginForm = () => {
  const [formState, action] = useFormState(LoginFormAction, {
    errors: {},
  });
  return (
    <>
      <h3 className="text-xl font-bold text-center ">Giriş Yap</h3>
      <form className="flex flex-col gap-4" action={action}>
        <Divider />
        <Input
          label="Email"
          name="email"
          placeholder="Email"
          className="mt-2"
          errorMessage={formState.errors.email}
          isInvalid={!!formState.errors.email}
          isRequired
          size="md"
        />
        <Input
          label="Password"
          name="password"
          type="password"
          errorMessage={formState.errors.password}
          isInvalid={!!formState.errors.password}
          placeholder="Password"
          className="mt-2"
          size="md"
          isRequired
        />
        {formState.errors._form ? (
          <div className="border rounded-md bg-red-200 p-2">
            {formState.errors._form}
          </div>
        ) : null}
        <ButtonForm color="success">Giriş Yap</ButtonForm>
      </form>
    </>
  );
};

export default LoginForm;
