import { useAuthUser } from "@/contexts";
import { SignInZodSchema } from "@/schemas/signInZodSchema";
import { SubmitSigninHandler, useSigninLib } from "./signin.lib";

export const useSignin = () => {
  const { signIn } = useAuthUser();
  const { formProps   } = useSigninLib()

  const handleSignin: SubmitSigninHandler = async (data: SignInZodSchema) => {
    await signIn(data);
  }

  return {formProps, handleSignin };

}

