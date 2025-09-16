"use client";

import BrandRoot from "@/components/BrandRoot";
import PasswordInput from "@/components/PasswordInput";
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
import { http } from "@/lib/api";
import {
  RegisterZodSchema,
  registerZodSchema,
} from "@/schemas/registerZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function AuthRegisterForm() {
  const router = useRouter();
  const form = useForm<RegisterZodSchema>({
    resolver: zodResolver(registerZodSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit(values: RegisterZodSchema) {
    const response: AxiosResponse<RegisterZodSchema> = await http({
      method: "POST",
      url: "/auth/register",
      data: {
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
      },
    });
    form.reset();
    console.log(response.data);
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
          <Card className="w-[300px] sm:w-[350px]">
            <CardHeader>
              <BrandRoot className="self-center " />
              <CardTitle className="text-lg">Registar</CardTitle>
              <CardDescription>Register para continuar.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Digíte seu nome completo..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Digíte seu telefone..."
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
                      <PasswordInput
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
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confimar Senha</FormLabel>
                    <FormControl>
                      <PasswordInput
                        type="password"
                        placeholder="Confirme sua senha..."
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
            <CardFooter className="flex gap-y-3 flex-col">
              <Button className="w-full" variant={"default"} type="submit">
                Registrar
              </Button>

              <Link
                href={"/auth/signin"}
                className={`flex gap-x-3 justify-center`}
              >
                Já tem conta?
                <span className="text-yellow-500">Entrar!</span>
              </Link>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
}
