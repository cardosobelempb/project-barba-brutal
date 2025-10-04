import { z } from 'zod'

import { passwordConfirmZodSchema } from './passwordConfirmeZod.schema'
import { passwordZodSchema } from './passwordZod.schema'

/**
 * Schema de validação para alteração de senha.
 * - currentPassword: senha atual obrigatória
 * - newPassword + confirmPassword: compostos no schema reutilizável `passwordConfirmeZodSchema`
 */
export const changePasswordZodSchema = z
  .object({
    currentPassword: passwordZodSchema, // Validação customizada da senha atual
  })
  .and(passwordConfirmZodSchema) // Combina com o schema de nova senha + confirmação

/**
 * Tipo inferido a partir do schema `changePasswordZodSchema`.
 * Pode ser usado para tipar o formulário, body da requisição, etc.
 */
export type ChangePasswordFormSchema = z.infer<typeof changePasswordZodSchema>
