import { registerZodSchema, RegisterZodSchema } from "@/schemas/registerZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

export type SubmitRegisterHandler = SubmitHandler<RegisterZodSchema>;

export const useRegisterLib = () => {
  const formProps = useForm<RegisterZodSchema>({
    resolver: zodResolver(registerZodSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirm: "",
    },
  })
  return { formProps };
}