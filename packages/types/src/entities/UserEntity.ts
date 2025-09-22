import { EmailVO, PasswordVO } from "@repo/core";

export interface UserEntity  {
  id?: string;
  name: string;
  email: EmailVO;
  password: PasswordVO;
  phone: string;
  barber: boolean;
};
