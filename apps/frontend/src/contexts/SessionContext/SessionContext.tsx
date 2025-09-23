"use client";

import { http } from "@/lib/api";
import { UserEntity } from "@repo/types";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type User = {
  id: string;
  email: string;
  role: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type LoginCredentials = {
  email: string;
  password: string;
};

type SignInResponse = {
  accessToken: string;
  refreshToken: string;
  user: UserEntity;
};

type SessionContextData = {
  signIn(credentials: LoginCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: UserEntity | null;
};

// Create context
const SessionContext = createContext({} as SessionContextData);

// Nomes dos cookies como constantes (boa prática)
const ACCESS_TOKEN_COOKIE = "belezixaadmin.accessToken";
const REFRESH_TOKEN_COOKIE = "belezixaadmin.refreshToken";
const USER_COOKIE = "belezixaadmin.user";

export function SessionProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserEntity | null>(null);
  const isAuthenticated = !!user;
  const router = useRouter();

  const parseJSON = (json: string) => {
    try {
      return JSON.parse(json);
    } catch (error) {
      return null;
    }
  };

  const loadingSession = useCallback(() => {
    // Recuperando cookies
    const cookies = parseCookies();
    const userComingFromCookie = cookies[USER_COOKIE];
    const refreshToken = cookies[REFRESH_TOKEN_COOKIE];

    const parsedUser = parseJSON(userComingFromCookie);
    if (parsedUser) {
      // console.log("userComingFromCookie", userComingFromCookie);
      // console.log("USER =>", userComingFromCookie);
      setUser(parsedUser);
    } else {
      signOut(router); // Se não tiver cookies válidos, redireciona para logout
    }
  }, []);

  useEffect(() => {
    loadingSession();
  }, []);

  const signIn = async ({ email, password }: LoginCredentials) => {
    try {
      const response = await http<SignInResponse>({
        method: "POST",
        url: "/auth/signin",
        data: { email, password },
        withCredentials: true, // 🔥 IMPORTANTE
      });

      console.log("Session Provider", response);

      const { accessToken, refreshToken, user } = response.data || {};

      if (!accessToken || !user) {
        throw new Error("Resposta do servidor inválida.");
      }

      if (!refreshToken || !user) {
        throw new Error("Resposta do servidor inválida.");
      }

      // Salvando cookies
      setCookie(undefined, ACCESS_TOKEN_COOKIE, accessToken, {
        maxAge: 60 * 60 * 24, // 1 dia
        path: "/",
      });

      setCookie(undefined, REFRESH_TOKEN_COOKIE, refreshToken, {
        maxAge: 60 * 60 * 24, // 1 dia
        path: "/",
      });

      setCookie(undefined, USER_COOKIE, JSON.stringify(user), {
        maxAge: 60 * 60 * 24, // 1 dia
        path: "/",
      });

      setUser(user); // Atualizando o estado do usuário

      // Agora, o token está incluído nas futuras requisições automaticamente.
      router.push("/"); // Redireciona para a página inicial
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

export const authUser = () => useContext(SessionContext);

// Função de logout
export async function signOut(router?: ReturnType<typeof useRouter>) {
  destroyCookie(undefined, ACCESS_TOKEN_COOKIE);
  destroyCookie(undefined, REFRESH_TOKEN_COOKIE);
  destroyCookie(undefined, USER_COOKIE);
  if (router) {
    router.push("/"); // Redireciona para a página inicial após o logout
  }
}
