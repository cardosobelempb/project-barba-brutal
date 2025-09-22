import { User } from "./user";

export interface UserCreateDTO extends User {
    confirmPassword: string
  }
