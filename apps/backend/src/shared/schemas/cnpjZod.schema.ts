import z from "zod";

import { isValidCNPJ } from "../utils/validations/isValidCNPJ";

/**
 * Schema para validação de CNPJ.
 * - Aceita formato com ou sem máscara.
 * - Valida apenas o formato com 14 dígitos.
 */
export const cnpjZodSchema = z
  .string()
  .trim()
  .transform((cnpj) => cnpj.replace(/\D/g, ''))
  .refine((cnpj) => isValidCNPJ(cnpj), {
    message: 'CNPJ inválido. Deve conter 14 dígitos numéricos.',
  })

  export type CnpjZodSchema = z.infer<typeof cnpjZodSchema>;
