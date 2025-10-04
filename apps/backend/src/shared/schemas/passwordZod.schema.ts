import { z } from 'zod'

/**
 * Schema para validação de senha.
 * Regras sugeridas:
 * - Mínimo 5 caracteres
 * - Pelo menos 1 letra maiúscula
 * - Pelo menos 1 letra minúscula
 * - Pelo menos 1 número
 * - Pelo menos 1 caractere especial
 */
export const passwordZodSchema = z.string()
  .min(5, { message: 'A senha deve ter pelo menos 5 caracteres.' })
  .regex(/[A-Z]/, { message: 'A senha deve conter pelo menos uma letra maiúscula.' })
  .regex(/[a-z]/, { message: 'A senha deve conter pelo menos uma letra minúscula.' })
  .regex(/\d/, { message: 'A senha deve conter pelo menos um número.' })
  .regex(/[@$!%*?&]/, { message: 'A senha deve conter pelo menos um caractere especial (@$!%*?&).' })
