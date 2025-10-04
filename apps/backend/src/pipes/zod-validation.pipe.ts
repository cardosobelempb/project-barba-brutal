import { BadRequestException, PipeTransform } from '@nestjs/common'
import { ZodError, ZodType } from 'zod'
import { fromZodError } from 'zod-validation-error'

/**
 * Pipe de validação genérico com Zod.
 * Permite tipar o valor retornado.
 */
export class ZodValidationPipe<T = any> implements PipeTransform {
  constructor(private readonly schema: ZodType<T>) {}

  transform(value: unknown): T {
    try {
      return this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Validation failed',
          statusCode: 400,
          errors: fromZodError(error),
        })
      }

      throw new BadRequestException('Validation failed')
    }
  }
}
