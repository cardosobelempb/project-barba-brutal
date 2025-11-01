import { ZodType } from 'zod'

import { ValidationPipe } from './zod-validation.lib'

/**
 * 🧱 Fábrica de instâncias do ZodValidationPipe.
 *
 * ✅ Compatível com todas as versões do Zod.
 * ✅ Tipagem forte e segura.
 * ✅ Lança erro se schema não for informado.
 *
 * @param schema Schema Zod com tipo inferido
 * @returns Instância do pipe tipado
 */
export function zodValidationPipe<T>(schema: ZodType<T>): ValidationPipe<T> {
  if (!schema) {
    throw new Error('❌ Schema Zod é obrigatório para criar o pipe de validação.')
  }

  return new ValidationPipe<T>(schema)
}
