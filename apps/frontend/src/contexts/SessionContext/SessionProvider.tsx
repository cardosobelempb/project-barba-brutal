"use client";

import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useCallback, useEffect, useMemo, useState } from "react";

import { SessionContext } from "./SessionContext";
import { REFRESH_TOKEN_COOKIE, USER_COOKIE } from "./sessionCookies";
import { sessionSignIn } from "./sessionSignIn";
import { sessionSignOut } from "./sessionSignOut";

import type {
  SessionCredentials,
  SessionProviderProps,
  UserEntity,
} from "@repo/types";

/**
 * Utilitário seguro para parsing de JSON.
 * Evita crash caso o JSON seja inválido.
 */
function safeJSONParse<T>(json: string | undefined | null): T | null {
  if (!json) return null;
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

/**
 * Hook para gerenciar sessão do usuário.
 * Isola lógica de leitura e atualização de cookies e estado.
 */
function useSessionManager() {
  const router = useRouter();
  const [user, setUser] = useState<UserEntity | null>(null);
  const isAuthenticated = !!user;

  /**
   * Carrega sessão a partir dos cookies.
   * Se não encontrar sessão válida, desloga.
   */
  const loadSession = useCallback(() => {
    const cookies = parseCookies();
    const userCookie = cookies[USER_COOKIE];
    const refreshToken = cookies[REFRESH_TOKEN_COOKIE];

    const parsedUser = safeJSONParse<UserEntity>(userCookie);

    if (parsedUser && refreshToken) {
      setUser(parsedUser);
    } else {
      // Deslogar de forma centralizada
      sessionSignOut(router);
    }
  }, [router]);

  /**
   * Realiza login e atualiza estado da sessão.
   * Em caso de falha, apenas loga o erro (UI deve tratar).
   */
  const signIn = useCallback(
    async (credentials: SessionCredentials) => {
      try {
        const loggedUser = await sessionSignIn(credentials);
        setUser(loggedUser);
        router.push("/"); // Redireciona após login
      } catch (error) {
        console.error("Erro ao autenticar:", error);
        // Aqui podemos disparar toast ou outro mecanismo de feedback
      }
    },
    [router],
  );

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  return { user, isAuthenticated, signIn };
}

/**
 * Provedor de sessão.
 * Responsável apenas por fornecer contexto, sem lógica complexa.
 */
export function SessionProvider({ children }: SessionProviderProps) {
  const { user, isAuthenticated, signIn } = useSessionManager();

  // Memoriza contexto para evitar re-renderizações desnecessárias
  const contextValue = useMemo(
    () => ({ user, isAuthenticated, signIn }),
    [user, isAuthenticated, signIn],
  );

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
}
