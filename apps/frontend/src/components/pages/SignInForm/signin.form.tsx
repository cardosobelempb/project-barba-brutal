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
import { Form } from "@/components/ui/form";
import { useAuthUser } from "@/contexts";
import Link from "next/link";

import { HeadRoot } from "@/components/shared/HeadRoot";
import { ModalRoot } from "@/components/shared/ModalRoot";
import { DialogRoot } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaUserEdit } from "react-icons/fa";
import { useSignin } from "./signin.hook";

export const SignInForm = () => {
  const { isAuthenticated } = useAuthUser();
  const { formProps, handleSignin } = useSignin();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  const openModal = () => {
    alert("Modal opened");
  };
  return (
    <>
      <HeadRoot
        title="Belezix Admin | Login"
        description="Página de login do painel Admin do Belezix"
      />
      <DialogRoot
        open={false}
        setOpen={openModal}
        title="Modal"
        content="This is the modal content"
      >
        <Button onClick={openModal}>Open Dialog</Button>
      </DialogRoot>
      <ModalRoot
        title="Editar perfil"
        description="Atualize suas informações pessoais abaixo."
        btnTitle="Editar"
        icon={FaUserEdit}
        // onConfirm={() => console.log("Salvando alterações...")}
      >
        <form className="space-y-4">
          <input type="text" />
        </form>
      </ModalRoot>
      <Form {...formProps}>
        <form
          onSubmit={formProps.handleSubmit(handleSignin)}
          className="space-y-8"
        >
          <Card className="w-[300px] sm:w-[350px] border-none ">
            <CardHeader>
              <BrandRoot className="self-center" />
              <CardTitle className="text-lg">Entrar</CardTitle>
              <CardDescription>Faça login para continuar.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <InputRoot
                control={formProps.control}
                name="email"
                label="E-mail"
                placeholder="Digite seu e-mail..."
                type="email"
              />

              <InputRoot
                control={formProps.control}
                name="password"
                label="Senha"
                placeholder="Digite sua senha..."
                type="password"
                asPassword // usa PasswordInput
              />
            </CardContent>
            <CardFooter className="fex flex-col gap-y-3">
              <Button
                disabled={formProps.formState.isSubmitting}
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
};
