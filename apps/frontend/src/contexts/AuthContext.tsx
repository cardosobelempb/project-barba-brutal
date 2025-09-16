"use client";

import { http } from "@/lib/api";
import { useRouter } from "next/navigation";

import { destroyCookie, parseCookies, setCookie } from "nookies";
import {
  createContext,
  ReactNode,
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

type AuthContextData = {
  signIn(credentials: LoginCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: User | null;
};

const AuthContext = createContext({} as AuthContextData);

// Nomes dos cookies como constantes (boa prática)
const TOKEN_COOKIE = "belezixaadmin.token";
const REFRESH_TOKEN_COOKIE = "belezixaadmin.refreshToken";
const USER_COOKIE = "belezixaadmin.user";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;
  const router = useRouter();

  const parseJSON = (json: string) => {
    try {
      return JSON.parse(json);
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const {
      USER_COOKIE: userComingFromCookie,
      REFRESH_TOKEN_COOKIE: refreshToken,
    } = parseCookies();
    const parsedUser = parseJSON(userComingFromCookie);
    if (parsedUser && refreshToken) {
      console.log("userComingFromCookie", userComingFromCookie);
      setUser(parsedUser);
    } else {
      signOut(router);
    }
  }, []);

  const signIn = async ({ email, password }: LoginCredentials) => {
    try {
      const response = await http({
        method: "POST",
        url: "/auth/signin",
        data: {
          email,
          password,
          // passwordConfirmation: password, // REMOVA se o back não exige isso
        },
      });

      const {
        accessToken: token,
        refreshToken,
        user: userComing,
      } = response?.data || {};

      if (!token || !refreshToken || !userComing) {
        throw new Error("Resposta do servidor inválida.");
      }

      setCookie(undefined, TOKEN_COOKIE, token, {
        maxAge: 60 * 60 * 24, // 1 dia
        path: "/",
      });

      setCookie(undefined, REFRESH_TOKEN_COOKIE, refreshToken, {
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      setCookie(undefined, USER_COOKIE, JSON.stringify(userComing), {
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      setUser(userComing);

      http({ timeout: 5000 });
      http({
        headers: { Authorization: `Bearer ${token}` },
      });

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
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export async function signOut(router?: ReturnType<typeof useRouter>) {
  destroyCookie(undefined, TOKEN_COOKIE);
  destroyCookie(undefined, REFRESH_TOKEN_COOKIE);
  destroyCookie(undefined, USER_COOKIE);
  if (router) {
    router.push("/");
  }
}
