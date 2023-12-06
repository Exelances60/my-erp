"use server";
import { signIn } from "@/utils/firebase-utils";
import { redirect } from "next/navigation";
import { z } from "zod";
import { cookies } from "next/headers";

interface LoginFormState {
  errors: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
}

const LoginFormSchema = z.object({
  email: z.string().email({ message: "Geçersiz email girdiniz" }),
  password: z.string().min(6, { message: "Şifre 6 karakterden az olamaz" }),
});

export const LoginFormAction = async (
  formState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> => {
  const result = LoginFormSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await signIn(result.data.email, result.data.password);
    const token = await response.user.getIdToken();
    const time = 3 * 60 * 60 * 1000;
    await cookies().set("token", token, {
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + time),
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === "Firebase: Error (auth/wrong-password).") {
        return {
          errors: {
            _form: ["Şifreniz yanlış"],
          },
        };
      }
      if (error.message === "Firebase: Error (auth/invalid-credential).") {
        return {
          errors: {
            _form: ["Bu email ile bir kullanıcı bulunamadı"],
          },
        };
      } else {
        return {
          errors: {
            _form: [error.message],
          },
        };
      }
    } else {
      return {
        errors: {
          _form: ["Bir hata oluştu"],
        },
      };
    }
  }
  redirect("/dashboard");
};
