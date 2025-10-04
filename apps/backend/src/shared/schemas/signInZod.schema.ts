import { z } from 'zod'

import { emailZodSchema } from './emailZod.schema'
import { passwordZodSchema } from './passwordZod.schema'

/**
 * Schema para validação do formulário de login.
 * Campos:
 * - email: validado conforme emailZodSchema
 * - password: validado conforme passwordZodSchema
 */
export const signInZodSchema = z.object({
  email: emailZodSchema,
  password: passwordZodSchema,
})

/**
 * Tipo inferido para os dados de login.
 */
export type SignInSchemaType = z.infer<typeof signInZodSchema>
