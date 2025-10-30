"use client";

import BrandRoot from "@/components/shared/BrandRoot";
import { InputRoot } from "@/components/shared/InputRoot";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import { Form } from "@/components/ui/form";
import { useRegister } from "./register.hook";

export const RegisterForm = () => {
  const { formProps, handleRegister } = useRegister();

  return (
    <>
      <Form {...formProps}>
        <form
          onSubmit={formProps.handleSubmit(handleRegister)}
          className="space-y-8"
        >
          <Card className="w-[300px] sm:w-[350px]">
            <CardHeader>
              <BrandRoot className="self-center " />
              <CardTitle className="text-lg">Registar</CardTitle>
              <CardDescription>Register para continuar.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <InputRoot
                control={formProps.control}
                name="name"
                label="Nome"
                placeholder="Digíte seu nome completo..."
                type="text"
              />

              <InputRoot
                control={formProps.control}
                name="email"
                label="Email"
                placeholder="Digíte seu email..."
                type="email"
              />

              <InputRoot
                control={formProps.control}
                name="phone"
                label="Telefone"
                placeholder="Digíte seu telefone..."
                type="tel"
              />

              <InputRoot
                control={formProps.control}
                name="password"
                label="Senha"
                placeholder="Digite sua senha..."
                type="password"
                asPassword // usa PasswordInput
              />

              <InputRoot
                control={formProps.control}
                name="passwordConfirm"
                label="Confimar Senha"
                placeholder="Confirme sua senha..."
                type="password"
                asPassword // usa PasswordInput
              />
            </CardContent>
            <CardFooter className="flex gap-y-3 flex-col">
              <Button
                disabled={formProps.formState.isSubmitting}
                className="w-full"
                variant={"default"}
                type="submit"
              >
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
};
