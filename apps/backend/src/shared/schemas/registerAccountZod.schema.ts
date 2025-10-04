import { z } from 'zod'

import { emailZodSchema } from './emailZod.schema'
import { nameZodSchema } from './nameZod.shema'
// Corrigido nome do arquivo
import { passwordZodSchema } from './passwordZod.schema'
import { phoneZodSchema } from './phoneZod.schema'

// Corrigido nome do arquivo

/**
 * Schema de validação para criação de conta.
 * Composto por schemas reutilizáveis de campos individuais.
 */
export const registerAccountZodSchema = z.object({
  name: nameZodSchema,
  email: emailZodSchema,
  password: passwordZodSchema,
  phone: phoneZodSchema,
})

/**
 * Tipo inferido a partir do schema de cadastro.
 * Pode ser usado para tipar body de requisição, formulários, etc.
 */
export type RegisterAccountZodSchema = z.infer<typeof registerAccountZodSchema>
