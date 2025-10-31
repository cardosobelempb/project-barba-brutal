"use client";

import type { SessionContextData } from "@repo/types";
import { createContext, useContext } from "react";

/**
 * Contexto que armazena informações de sessão e métodos de autenticação
 */
export const SessionContext = createContext<SessionContextData | null>(null);

/**
 * Hook customizado para acessar dados de sessão do usuário
 *
 * ⚠️ Deve ser usado apenas dentro de um <SessionProvider>
 */
export const useAuthUser = (): SessionContextData => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error(
      "useAuthUser deve ser usado dentro de um <SessionProvider>",
    );
  }

  return context;
};
