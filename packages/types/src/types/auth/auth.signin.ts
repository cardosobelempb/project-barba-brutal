import { EmailVO, PasswordVO } from '@repo/core'

export interface AuthSignInProps {
  email: EmailVO
  password: PasswordVO
}
