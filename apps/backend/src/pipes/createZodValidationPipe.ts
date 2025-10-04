import { ZodType } from 'zod'

import { ZodValidationPipe } from './zod-validation.pipe'

// ajuste para o caminho real

/**
 * Cria dinamicamente um ZodValidationPipe com tipagem forte.
 * @param schema - Schema Zod com tipo inferido
 * @returns Instância do pipe tipado
 */
export function createZodValidationPipe<T>(schema: ZodType<T>) {
  return new ZodValidationPipe<T>(schema)
}
