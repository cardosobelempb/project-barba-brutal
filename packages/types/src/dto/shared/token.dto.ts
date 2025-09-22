import { User } from "../user/user";

export interface TokenDTO extends User {
    token: string
  }
