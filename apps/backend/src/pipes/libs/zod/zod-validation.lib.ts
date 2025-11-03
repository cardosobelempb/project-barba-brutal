import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common'
import { ZodError, ZodType } from 'zod'

import { formatZodError } from './format.zod.error'

export class ValidationPipe<T> implements PipeTransform<unknown, T> {
  constructor(private readonly schema: ZodType<T>) {}

  transform(value: unknown, metadata: ArgumentMetadata): T {
    try {
      return this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        // 🚀 Aqui preservamos o contexto do Zod no BadRequestException
        throw new BadRequestException(formatZodError(error, metadata.type))
      }

      // 🚨 Erro inesperado
      throw new BadRequestException({
        message: 'Validation failed due to unexpected error',
        error: 'Bad Request',
      })
    }
  }
}
