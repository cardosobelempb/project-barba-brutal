import { http } from "@/lib/api";
import { setCookie } from "nookies";

import type { SessionCredentials, SessionResponse, UserEntity } from "@repo/types";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  USER_COOKIE,
} from "./sessionCookies";

/**
 * Função para autenticar o usuário via API e salvar os dados em cookies.
 */
export async function sessionSignIn(
  credentials: SessionCredentials,
): Promise<UserEntity> {
  const response = await http<SessionResponse>({
    method: "POST",
    url: "/auth/signin",
    data: credentials,
    withCredentials: true,
  });

  const { accessToken, refreshToken, user } = response.data || {};

  if (!accessToken || !refreshToken || !user) {
    throw new Error("Resposta do servidor inválida.");
  }

  // Salvando cookies
  setCookie(undefined, ACCESS_TOKEN_COOKIE, accessToken, {
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  setCookie(undefined, REFRESH_TOKEN_COOKIE, refreshToken, {
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  setCookie(undefined, USER_COOKIE, JSON.stringify(user), {
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return user;
}
