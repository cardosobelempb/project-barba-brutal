import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import {
  BadRequestError,
  ConflictError,
  DataIntegrityViolationError,
  EntityNotFoundError,
  ErrorConstants,
  MethodArgumentNotValidError,
  NotAllwedError,
  ResourceNotFoundError,
} from '@repo/core'
import { Request, Response } from 'express'
import { ZodError } from 'zod'

// ============================================================
// 📘 Tipos base de erro
// ============================================================

interface StandardError {
  timestamp: string
  status: number
  error: string
  message: string
  path: string
}

interface ValidationError extends StandardError {
  errors?: Array<{ field: string; message: string }>
}

// ============================================================
// ⚙️ Mapeamento de exceções conhecidas (customizadas do domínio)
// ============================================================

const ExceptionMap = new Map<
  new (...args: any[]) => Error,
  { status: HttpStatus; errorCode: string }
>([
  [ConflictError, { status: HttpStatus.CONFLICT, errorCode: ErrorConstants.CONFLICT_ERROR }],
  [ResourceNotFoundError, { status: HttpStatus.NOT_FOUND, errorCode: ErrorConstants.RESOURCE_NOT_FOUND }],
  [EntityNotFoundError, { status: HttpStatus.NOT_FOUND, errorCode: ErrorConstants.NOT_FOUND }],
  [NotAllwedError, { status: HttpStatus.METHOD_NOT_ALLOWED, errorCode: ErrorConstants.METHOD_NOT_ALLOWED }],
  [DataIntegrityViolationError, { status: HttpStatus.UNPROCESSABLE_ENTITY, errorCode: ErrorConstants.DATA_INTEGRITY_VIOLATION }],
  [BadRequestError, { status: HttpStatus.BAD_REQUEST, errorCode: ErrorConstants.BAD_REQUEST }],
  [MethodArgumentNotValidError, { status: HttpStatus.BAD_REQUEST, errorCode: ErrorConstants.INTEGRITY_VIOLATION }],
])

// ============================================================
// 🧱 Filtro Global de Erros — Centraliza o tratamento
// ============================================================

@Catch()
export class ErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(ErrorFilter.name)

  catch(exception: Error | ZodError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    // ========================================================
    // 🧩 1. Caso específico: erros de validação Zod
    // ========================================================
    if (exception instanceof ZodError) {
      this.logger.warn('Zod validation error detected', exception.stack)

      const status = HttpStatus.UNPROCESSABLE_ENTITY

      const validationError: ValidationError = {
        timestamp: new Date().toISOString(),
        status,
        error: ErrorConstants.INTEGRITY_VIOLATION,
        message: 'Validation failed',
        errors: exception.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
        path: request.url,
      }

      return response.status(status).json(validationError)
    }

    // ========================================================
    // ⚙️ 2. Erros conhecidos mapeados (domínio / core)
    // ========================================================
    const mapped = this.mapException(exception)
    if (mapped) {
      this.logger.error(`[${exception.name}]`, exception.stack)

      const standardError: StandardError = {
        timestamp: new Date().toISOString(),
        status: mapped.status,
        error: mapped.errorCode,
        message: exception.message || 'Unexpected error',
        path: request.url,
      }

      return response.status(mapped.status).json(standardError)
    }

    // ========================================================
    // 🚨 3. Fallback genérico (erro não tratado)
    // ========================================================
    this.logger.error(
      'Unhandled exception detected',
      exception.stack || exception.message,
    )

    const fallback: StandardError = {
      timestamp: new Date().toISOString(),
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'INTERNAL_SERVER_ERROR',
      message: exception.message || 'Unexpected internal error',
      path: request.url,
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(fallback)
  }

  /**
   * 🔍 Mapeia exceções conhecidas para status/código padrão.
   * Permite extensão futura com novos tipos de erro sem alterar o core.
   */
  private mapException(exception: Error) {
    for (const [type, info] of ExceptionMap.entries()) {
      if (exception instanceof type) return info
    }
    return undefined
  }
}
