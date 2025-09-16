"use client";

import BrandRoot from "@/components/BrandRoot";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  SignInZodSchema,
  signInZodSchema,
} from "./../../../schemas/signInZodSchema";

export default function AuthSignInForm() {
  const router = useRouter();
  const form = useForm<SignInZodSchema>({
    resolver: zodResolver(signInZodSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInZodSchema) {
    console.log(values);
    // await authClient.signIn.email({
    //   email: values.email,
    //   password: values.password,
    //   fetchOptions: {
    //     onSuccess: () => {
    //       toast.success("Login realizado com sucesso!");
    //       router.push("/");
    //     },
    //     onError: (ctx) => {
    //       if (ctx.error.code === "USER_NOT_FOUND") {
    //         toast.error("Email não cadastrado.");
    //         return form.setError("email", {
    //           type: "manual",
    //           message: "Email ou senha inválidos.",
    //         });
    //       }
    //       if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
    //         toast.error("Email ou senha inválidos.");
    //         form.setError("email", {
    //           type: "manual",
    //           message: "Email ou senha inválidos.",
    //         });
    //         return form.setError("password", {
    //           type: "manual",
    //           message: "Email ou senha inválidos.",
    //         });
    //       }
    //       toast.error(ctx.error.message || "Erro ao realizar login.");
    //     },
    //   },
    // });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="w-full sm:w-[350px] border-none ">
            <CardHeader>
              <BrandRoot className="self-center " />
              <CardTitle className="text-lg">Entrar</CardTitle>
              <CardDescription>Faça login para continuar.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Digíte seu email..."
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Digíte sua senha..."
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="fex flex-col gap-y-3">
              <Button
                className={`px-4 py-2  rounded-md  w-full`}
                variant={"default"}
                type="submit"
              >
                Entrar
              </Button>

              <Link
                href={"/auth/register"}
                className={`flex gap-x-3 justify-center`}
              >
                Ainda não tem conta?
                <span className="text-yellow-500">Registre-se!</span>
              </Link>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
}
