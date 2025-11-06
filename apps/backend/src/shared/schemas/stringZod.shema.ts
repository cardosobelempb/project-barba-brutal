import { z } from 'zod'

/**
 * Schema de validação para nomes de pessoas.
 * - Mínimo de 2 caracteres.
 * - Máximo de 100 caracteres.
 * - Mensagens de erro personalizadas.
 */
export const stringZodSchema = z.string()
  .min(2, { message: 'O nome deve ter pelo menos 2 caracteres.' })
  .max(100, { message: 'O nome é muito longo.' })
  .transform((name) => name.trim().replace(/\b\w/g, (c) => c.toUpperCase()))

export type StringZodSchema = z.infer<typeof stringZodSchema>
