import { BadRequestError } from '../controllers/bad-request.error'
import { AlreadyExistsError } from './already-exists.error'
import { ConflictError } from './conflict.error'
import { DataIntegrityViolationError } from './data-integrity-violation.error'
import { DuplicateError } from './duplicate.error'
import { EntityNotFoundError } from './entity-not-found.error'
import { ErrorConstants } from './error-constants.error'
import { ForbiddenError } from './forbidden.error'
import { IllegalArgumentError } from './illegal-argument.error'
import { MethodArgumentNotValidError } from './method-argument-not-valid.error'
import { NotAllwedError } from './not-allwed.error'
import { NotFoundError } from './not-found.error'
import { ResourceNotFoundError } from './resource-not-found.error'
import { IServiceError } from './service-error.interface'
import { UnauthorizedError } from './unauthorized.error'
import { UnprocessableEntityError } from './unprocessable.error'
import { UnsupportedMediaTypeError } from './unsupported-media-type-error'

export type {IServiceError}

export {
  DuplicateError,
  DataIntegrityViolationError,
  ErrorConstants,
  ForbiddenError,
  IllegalArgumentError,
  NotFoundError,
  MethodArgumentNotValidError,
  ResourceNotFoundError,
  UnauthorizedError,
  BadRequestError,
  ConflictError,
  AlreadyExistsError,
  UnsupportedMediaTypeError,
  UnprocessableEntityError,
  EntityNotFoundError,
  NotAllwedError,
}
