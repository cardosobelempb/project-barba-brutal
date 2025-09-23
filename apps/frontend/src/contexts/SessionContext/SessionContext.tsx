"use client";

import type { SessionContextData } from "@repo/types";
import { createContext, useContext } from "react";

export const SessionContext = createContext({} as SessionContextData);

export const useAuthUser = () => useContext(SessionContext);
