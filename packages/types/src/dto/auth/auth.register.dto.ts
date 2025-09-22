import { User } from "../user";

export interface AuthRegisterDTO extends User {
    confirmPassword: string
  }
