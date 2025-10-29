import { signInZodSchema, SignInZodSchema } from "@/schemas/signInZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

export type SubmitSigninHandler = SubmitHandler<SignInZodSchema>;

export const useSigninLib = () => {
  const formProps = useForm<SignInZodSchema>({
    resolver: zodResolver(signInZodSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  return { formProps };
}
