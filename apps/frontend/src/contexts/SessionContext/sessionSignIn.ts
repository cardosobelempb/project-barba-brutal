import { api } from "@/lib/api/api";
import type { SessionCredentials, UserEntity } from "@repo/types";
import { setCookie } from "nookies";
import { toast } from "sonner"; // Biblioteca de notificações

import { SessionResponse } from "@repo/types"; // Importando a interface tipada
import {
  ACCESS_TOKEN_COOKIE,
  ACCESS_TOKEN_COOKIE_MAX_AGE,
  REFRESH_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE_MAX_AGE,
  USER_COOKIE,
  USER_COOKIE_MAX_AGE,
} from "./sessionCookies";



/**
 * Função utilitária para salvar cookies com configuração padrão
 */
const saveCookie = (name: string, value: string, maxAge: number) => {
  setCookie(undefined, name, value, {
    maxAge,
    path: "/",
  });
};

/**
 * Autentica o usuário na API e armazena os dados nos cookies
 * @param credentials - Credenciais do usuário (email e senha)
 * @returns Dados do usuário autenticado
 * @throws Erro em caso de falha na autenticação
 */
export async function sessionSignIn(
  credentials: SessionCredentials
): Promise<UserEntity> {
  try {
    const { email, password } = credentials;

    // Requisição para autenticar usuário
    const response = await api.post<SessionResponse>("/auth/signin", {
      email,
      password,
      passwordConfirmation: password, // Se exigido pela API
    });

    const { accessToken, refreshToken, user } = response.data;

    // Validação da resposta
    if (!accessToken || !refreshToken || !user) {
      throw new Error("Dados incompletos retornados da API.");
    }

    // Salvar tokens e dados do usuário nos cookies
    saveCookie(ACCESS_TOKEN_COOKIE, accessToken, ACCESS_TOKEN_COOKIE_MAX_AGE);
    saveCookie(REFRESH_TOKEN_COOKIE, refreshToken, REFRESH_TOKEN_COOKIE_MAX_AGE);
    saveCookie(USER_COOKIE, JSON.stringify(user), USER_COOKIE_MAX_AGE);

    // Configurar token padrão nos headers para futuras requisições
    api.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
    api.defaults.timeout = 5000;

    toast.success("Login realizado com sucesso!");
    return user;

  } catch (error: any) {
    console.error("Erro ao autenticar usuário:", error);

    // Mensagem personalizada baseada no tipo de erro
    const message =
      error?.response?.data?.message ??
      error?.message ??
      "Erro inesperado. Tente novamente mais tarde.";

    toast.error(`Falha no login: ${message}`);
    throw error; // Repropaga o erro para quem chamou, se necessário
  }
}
