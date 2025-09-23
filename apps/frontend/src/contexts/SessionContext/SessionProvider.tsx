"use client";

import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useCallback, useEffect, useMemo, useState } from "react";

import { SessionContext } from "./SessionContext";
import { REFRESH_TOKEN_COOKIE, USER_COOKIE } from "./sessionCookies";
import { sessionSignOut } from "./sessionSignOut";

import type {
  SessionCredentials,
  SessionProviderProps,
  UserEntity,
} from "@repo/types";
import { sessionSignIn } from "./sessionSignIn";

export function SessionProvider({ children }: SessionProviderProps) {
  const [user, setUser] = useState<UserEntity | null>(null);
  const isAuthenticated = !!user;
  const router = useRouter();

  const parseJSON = (json: string) => {
    try {
      return JSON.parse(json);
    } catch {
      return null;
    }
  };

  const loadingSession = useCallback(() => {
    const cookies = parseCookies();
    const userFromCookie = cookies[USER_COOKIE];
    const refreshToken = cookies[REFRESH_TOKEN_COOKIE];

    const parsedUser = parseJSON(userFromCookie);

    if (parsedUser) {
      setUser(parsedUser);
    } else {
      sessionSignOut(router);
    }
  }, [router]);

  useEffect(() => {
    loadingSession();
  }, [loadingSession]);

  const signIn = async (credentials: SessionCredentials) => {
    try {
      const user = await sessionSignIn(credentials);
      setUser(user);
      router.push("/");
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      alert(
        "Erro ao autenticar. Verifique suas credenciais ou tente mais tarde.",
      );
    }
  };

  const contextValue = useMemo(
    () => ({
      signIn,
      isAuthenticated,
      user,
    }),
    [user, isAuthenticated],
  );

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
}
