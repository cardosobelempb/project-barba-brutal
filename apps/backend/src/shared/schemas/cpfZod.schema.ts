import { z } from 'zod'

import { isValidCPF } from '../utils/validations/isValidCPF'

/**
 * Schema para validação de CPF.
 * - Aceita formato com ou sem máscara.
 * - Valida apenas se o padrão for compatível com CPF (não valida dígitos verificadores).
 */
export const cpfZodSchema = z
  .string()
  .trim()
  .transform((cpf) => cpf.replace(/\D/g, '')) // remove máscara
  .refine((cpf) => isValidCPF(cpf), {
    message: 'CPF inválido. Deve conter 11 dígitos numéricos.',
  })
