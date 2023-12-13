"use server";

import { db } from "@/db";
import { createUser } from "@/utils/firebase-utils";
import { revalidatePath } from "next/cache";

interface CreateAddUserState {
  stateManaget: {
    email?: string[];
    name?: string[];
    password?: string[];
    _form?: string[];
    succes?: boolean;
  };
}

export const CreateAddUser = async (
  formState: CreateAddUserState,
  formData: {
    email: string;
    name: string;
    password: string;
    role: string;
  }
): Promise<CreateAddUserState> => {
  const { email, name, password, role } = formData;
  if (!email || !name || !password || !role) {
    return {
      stateManaget: {
        _form: ["Please fill in all fields"],
      },
    };
  }

  try {
    const response = await createUser(email, password);
    const token = await response.user.getIdToken();

    await db.user.create({
      data: {
        email: email,
        name: name,
        uid: response.user.uid,
        device: "web",
        token: token,
        password: password,
        role: role,
        photoUrl: "",
      },
    });
    revalidatePath("/dashboard/createUser");
    return {
      stateManaget: {
        succes: true,
      },
    };
  } catch (error: any) {
    return {
      stateManaget: {
        _form: [error.message],
      },
    };
  }
};
