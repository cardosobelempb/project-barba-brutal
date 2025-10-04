import { z } from 'zod'

/**
 * Schema de validação para e-mails.
 * - Garante que a entrada seja uma string válida de e-mail.
 * - Retorna mensagem customizada caso inválido.
 */
export const emailZodSchema = z
  .email({ message: 'E-mail inválido.' })
  .transform((val) => val.toLowerCase())

