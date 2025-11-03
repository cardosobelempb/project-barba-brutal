import { api } from "@/lib/api/api";
import { setCookie } from "nookies";
import { toast } from "sonner";

import type { SessionCredentials, UserEntity } from "@repo/types";
import { SessionResponse } from "@repo/types";

import { AxiosError } from "axios";
import {
  ACCESS_TOKEN_COOKIE,
  ACCESS_TOKEN_COOKIE_MAX_AGE,
  REFRESH_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE_MAX_AGE,
  USER_COOKIE,
  USER_COOKIE_MAX_AGE,
} from "./sessionCookies";

/**
 * Salva um cookie de forma segura com configuração padrão
 */
function saveCookie(name: string, value: string, maxAge: number): void {
  if (!name || !value) {
    console.warn(`Tentativa de salvar cookie inválido: ${name}`);
    return;
  }

  setCookie(undefined, name, value, {
    maxAge,
    path: "/",
    sameSite: "lax", // Evita CSRF básico
    secure: process.env.NODE_ENV === "production", // Cookies seguros em produção
  });
}

/**
 * Configura o token de autenticação padrão na instância da API
 */
function setAuthToken(token: string): void {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
}

/**
 * Função principal para autenticar o usuário.
 * - Chama a API de login
 * - Salva cookies
 * - Configura token para futuras requisições
 * - Retorna usuário autenticado
 */
export async function sessionSignIn(
  credentials: SessionCredentials
): Promise<UserEntity> {
  try {
    const { email, password } = credentials;

    // Validação mínima antes da requisição
    if (!email || !password) {
      throw new Error("Email e senha são obrigatórios.");
    }

    // Requisição de login
    const response = await api.post<SessionResponse>("/auth/signin", {
      email,
      password,
      passwordConfirmation: password, // Caso a API exija
    });

    console.log("Resposta da API de login:", response.data);

    const { accessToken, refreshToken, user } = response.data;

    // Validação da resposta
    if (!accessToken || !refreshToken || !user) {
      throw new Error("Resposta incompleta da API.");
    }

    // Salva dados nos cookies
    saveCookie(ACCESS_TOKEN_COOKIE, accessToken, ACCESS_TOKEN_COOKIE_MAX_AGE);
    saveCookie(REFRESH_TOKEN_COOKIE, refreshToken, REFRESH_TOKEN_COOKIE_MAX_AGE);
    saveCookie(USER_COOKIE, JSON.stringify(user), USER_COOKIE_MAX_AGE);

    // Configura token padrão
    setAuthToken(accessToken);

    // Feedback ao usuário
    toast.success("Login realizado com sucesso!");

    return user;
  } catch (error: any) {
    console.log("Erro ao tentar fazer login:", error.response.data.errors);

    if(error instanceof AxiosError && error.response?.status === 401) {
      toast.error("Credenciais inválidas. Verifique seu email e senha.");
      throw new Error("Credenciais inválidas.");
    }
    // Extrai mensagem de erro de forma segura
    // const message =
    //   error?.response?.data?.message ||
    //   error?.message ||
    //   "Erro inesperado. Tente novamente mais tarde.";

    // toast.error(`Falha no login: ${message}`);

    // Log detalhado para debugging
    // console.error("sessionSignIn error:", error);

    // Repropaga o erro para tratamento externo (ex.: componente)
    throw new Error(error);
  }
}
