import React from "react";
import ButtonForm from "../login/ButtonForm";
import { signOutAction } from "@/actions/SignOutAction";

export const HeaderForm = () => {
  return (
    <>
      <form action={signOutAction}>
        <ButtonForm color="warning">Çıkış Yap</ButtonForm>
      </form>
    </>
  );
};
