import { http } from "@/lib/api";
import { RegisterZodSchema } from "@/schemas/registerZodSchema";

import { SubmitRegisterHandler, useRegisterLib } from "./register.lib";

export const useRegister = () => {
  const { formProps   } = useRegisterLib()

  const handleRegister: SubmitRegisterHandler = async (data: RegisterZodSchema) => {
    await http({
          method: "POST",
          url: "/accounts/register",
          data: {
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,
          },
        });
  }

  return {formProps, handleRegister };

}
