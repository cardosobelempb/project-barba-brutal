import { z } from 'zod';

/**
 * Schema para validação de número de telefone brasileiro.
 * Aceita formatos com:
 * - Código do país opcional (+55)
 * - DDD opcional (com ou sem parênteses)
 * - Número com 4 ou 5 dígitos na parte inicial e 4 dígitos na parte final
 * - Hífen opcional
 *
 * Exemplos válidos:
 * +55 (11) 91234-5678
 * (21) 1234-5678
 * 912345678
 * 12345678
 */
export const phoneZodSchema = z.string().regex(
  /^(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/,
  { message: 'Número de telefone inválido' }
).transform((phone) => phone.trim())

export type PhoneZodSchema = z.infer<typeof phoneZodSchema>;
