import { ReactNode } from "react";

import { UserEntity } from "../../entities";

export interface  SessionProviderProps {
  children: ReactNode;
};

export interface  SessionCredentials {
  email: string;
  password: string;
};

export interface SessionResponse {
  accessToken: string;
  refreshToken: string;
  user: UserEntity;
};

export interface SessionContextData {
  signIn(credentials: SessionCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: UserEntity | null;
};
