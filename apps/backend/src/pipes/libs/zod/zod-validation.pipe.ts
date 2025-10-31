import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common'
import { ZodError, ZodType } from 'zod'
import { createValidationError } from './create-validation.error'

/**
 * 🎯 Pipe genérico para validação com Zod.
 * - Realiza validação de dados em rotas NestJS.
 * - Mantém tipagem forte do tipo de retorno.
 * - Padroniza formato de erro HTTP.
 */
export class ZodValidationPipe<T> implements PipeTransform<unknown, T> {
  constructor(private readonly schema: ZodType<T>) {}

  transform(value: unknown, metadata: ArgumentMetadata): T {
    try {
      // ✅ Valida os dados conforme o schema
      const parsedValue = this.schema.parse(value)
      return parsedValue
    } catch (error) {
      // ⚠️ Tratamento específico de erros do Zod
      if (error instanceof ZodError) {
        // ✅ Erro padronizado seguindo convenções REST
        throw new BadRequestException(createValidationError(error, metadata?.type))
      }

      // 🚨 Erro inesperado
      throw new BadRequestException({
        statusCode: 400,
        message: 'Validation failed due to unexpected error',
        error: 'Bad Request',
      })
    }
  }
}
