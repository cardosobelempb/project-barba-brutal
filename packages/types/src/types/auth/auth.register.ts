import { EmailVO, NameVO, PasswordVO, PhoneVO, UUIDVO } from '@repo/core';

export interface AuthRegisterProps {
    id?: UUIDVO;
    name: NameVO;
    email: EmailVO;
    password: PasswordVO;
    phone: PhoneVO;
    barber: boolean;
    confirmPassword: PasswordVO
  }
