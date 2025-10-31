"use client";

import BrandRoot from "@/components/shared/BrandRoot";
import { HeadRoot } from "@/components/shared/HeadRoot";
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
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSignin } from "./signin.hook";

/**
 * 🧩 Componente de formulário de login
 *
 * Responsabilidades:
 * - Exibir UI de login e integração com o hook `useSignin`
 * - Tratar estados de submissão e erro
 * - Redirecionar usuários autenticados automaticamente
 */
export const SignInForm = () => {
  const { isAuthenticated } = useAuthUser();
  const { formProps, handleSignin, loading, error } = useSignin(); // adicionamos loading/error
  const router = useRouter();

  /** Redireciona se o usuário já estiver autenticado */
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  /** Placeholder de abertura de modal */
  const openModal = () => {
    alert("Modal opened");
  };

  return (
    <>
      <HeadRoot
        title="Belezix Admin | Login"
        description="Página de login do painel Admin do Belezix"
      />

      {/* ====== Formulário de Login ====== */}
      <Form {...formProps}>
        <form
          onSubmit={formProps.handleSubmit(handleSignin)}
          className="space-y-8"
        >
          <Card className="w-[300px] sm:w-[350px] border-none mx-auto">
            <CardHeader className="items-center">
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
                asPassword
              />

              {/* 🔥 Feedback de erro (UX amigável) */}
              {error && (
                <p className="text-sm text-red-500 text-center mt-2">{error}</p>
              )}
            </CardContent>

            <CardFooter className="flex flex-col gap-y-3">
              <Button
                disabled={loading || formProps.formState.isSubmitting}
                className="px-4 py-2 rounded-md w-full"
                variant="default"
                type="submit"
              >
                {loading || formProps.formState.isSubmitting
                  ? "Entrando..."
                  : "Entrar"}
              </Button>

              <Link
                href="/auth/register"
                className="flex gap-x-3 justify-center"
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
