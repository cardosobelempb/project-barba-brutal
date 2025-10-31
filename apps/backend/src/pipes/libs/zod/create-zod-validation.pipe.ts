import { ZodType } from 'zod'
import { ZodValidationPipe } from './zod-validation.pipe'

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
export function createZodValidationPipe<T>(schema: ZodType<T>): ZodValidationPipe<T> {
  if (!schema) {
    throw new Error('❌ Schema Zod é obrigatório para criar o pipe de validação.')
  }

  return new ZodValidationPipe<T>(schema)
}
