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

export function SessionProvider({ children }: SessionProviderProps) {
  // State to store the user data, initially null
  const [user, setUser] = useState<UserEntity | null>(null);
  const isAuthenticated = !!user; // Boolean indicating if the user is authenticated
  const router = useRouter();

  // Helper function to safely parse JSON, returning null in case of error
  const parseJSON = useCallback((json: string) => {
    try {
      return JSON.parse(json);
    } catch {
      return null; // Return null if parsing fails
    }
  }, []);

  // Load the session data from cookies
  const loadSession = useCallback(() => {
    const cookies = parseCookies();
    const userCookie = cookies[USER_COOKIE];
    const refreshToken = cookies[REFRESH_TOKEN_COOKIE]; // We are extracting the refresh token for possible future use

    const parsedUser = parseJSON(userCookie);

    if (parsedUser && refreshToken) {
      setUser(parsedUser); // If user is found in cookies, update the state
    } else {
      sessionSignOut(router); // If no valid user found, sign out
    }
  }, [router, parseJSON]);

  // Effect to load the session when the component mounts
  useEffect(() => {
    loadSession();
  }, [loadSession]);

  // Function to handle user sign-in
  const signIn = async (credentials: SessionCredentials) => {
    try {
      const user = await sessionSignIn(credentials); // Sign in with credentials
      setUser(user); // On success, set the user state
      router.push("/"); // Redirect to the home page
    } catch (error) {
      console.error("Erro ao autenticar:", error); // Log error for debugging
      alert(
        "Erro ao autenticar. Verifique suas credenciais ou tente mais tarde.",
      ); // Show a user-friendly error message
    }
  };

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      signIn,
      isAuthenticated,
      user,
    }),
    [user, isAuthenticated], // Only update when user or isAuthenticated changes
  );

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
}
