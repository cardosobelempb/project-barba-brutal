import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common'
import { BadRequestError, ConflictError, DataIntegrityViolationError, EntityNotFoundError, ErrorCode, MethodArgumentNotValidError, NotAllwedError, ResourceNotFoundError } from '@repo/core'
import { Request, Response } from 'express'
import { ZodError } from 'zod'

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

@Catch()
export class ErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(ErrorFilter.name)

  catch(exception: Error | ZodError | BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    // ========================================================
    // ⚙️ 1. BadRequestException (incluindo erros Zod do pipe)
    // ========================================================
    if (exception instanceof BadRequestException) {
      const res = exception.getResponse() as any

      // 🚨 Caso venha do ValidationPipe (com erros do Zod)
      if (res?.errors && Array.isArray(res.errors)) {
        const validationError: ValidationError = {
          timestamp: new Date().toISOString(),
          status: HttpStatus.BAD_REQUEST,
          error: ErrorCode.BAD_REQUEST,
          message: res.message || 'Validation failed',
          errors: res.errors,
          path: request.url,
        }
        this.logger.warn(`Zod validation error detected at ${request.url}`)
        return response.status(HttpStatus.BAD_REQUEST).json(validationError)
      }

      // ⚙️ Caso padrão (sem erros detalhados)
      const standardError: StandardError = {
        timestamp: new Date().toISOString(),
        status: HttpStatus.BAD_REQUEST,
        error: ErrorCode.BAD_REQUEST,
        message: (res as any)?.message || exception.message,
        path: request.url,
      }
      this.logger.warn(`Bad request detected at ${request.url}`)
      return response.status(HttpStatus.BAD_REQUEST).json(standardError)
    }

    // ========================================================
    // ⚙️ 2. Erros conhecidos (domínio)
    // ========================================================
    if (exception instanceof ConflictError) {
      return this.handleError(exception, HttpStatus.CONFLICT, ErrorCode.CONFLICT_ERROR, request, response)
    }
    if (exception instanceof ResourceNotFoundError || exception instanceof EntityNotFoundError) {
      return this.handleError(exception, HttpStatus.NOT_FOUND, ErrorCode.NOT_FOUND, request, response)
    }
    if (exception instanceof BadRequestError || exception instanceof MethodArgumentNotValidError) {
      return this.handleError(exception, HttpStatus.BAD_REQUEST, ErrorCode.BAD_REQUEST, request, response)
    }
    if (exception instanceof DataIntegrityViolationError) {
      return this.handleError(exception, HttpStatus.UNPROCESSABLE_ENTITY, ErrorCode.DATA_INTEGRITY_VIOLATION, request, response)
    }
    if (exception instanceof NotAllwedError) {
      return this.handleError(exception, HttpStatus.METHOD_NOT_ALLOWED, ErrorCode.METHOD_NOT_ALLOWED, request, response)
    }

    // ========================================================
    // 🚨 3. Fallback genérico
    // ========================================================
    this.logger.error('Unhandled exception detected', exception.stack || exception.message)

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      timestamp: new Date().toISOString(),
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'INTERNAL_SERVER_ERROR',
      message: exception.message || 'Unexpected internal error',
      path: request.url,
    })
  }

  private handleError(
    exception: Error,
    status: number,
    errorCode: string,
    request: Request,
    response: Response
  ) {
    this.logger.error(`[${exception.name}]`, exception.stack)
    return response.status(status).json({
      timestamp: new Date().toISOString(),
      status,
      error: errorCode,
      message: exception.message || 'Unexpected error',
      path: request.url,
    })
  }
}
