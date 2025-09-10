export class ErrorConstants {
  private constructor() {}

  static readonly ENTITY_NOT_FOUND: string = 'entity-not-found.error'
  static readonly CONFLICT_ERROR: string = 'conflict.error'
  static readonly DUPLICATE_ERROR: string = 'duplicate.error'
  static readonly RESOURCE_NOT_FOUND: string = 'resource-not-found.error'
  static readonly VALID_SORT: string = '.No valid sortable fields were defined '
  static readonly EMAIL_NOT_FOUND: string = 'email-not-found.error '
  static readonly USER_NOT_FOUND: string = 'user-not-found.error'
  static readonly USER_FOUND: string = 'user-found.error'
  static readonly INTEGRITY_VIOLATION: string = 'integrity-violation.error'
  static readonly DATA_INTEGRITY_VIOLATION: string =
    'data-integrity-violation.error'

  static readonly INVALID_USER: string = '.Invalid user '
  static readonly ACCESS_DENIED: string = 'access-denied.error'
  static readonly FORBIDDEN: string = 'forbidden-error'
  static readonly NOT_FOUND: string = 'resource-not-found.error'
  static readonly BAD_REQUEST: string = 'bad-request.error'
  static readonly UNPROCESSABLE_ENTITY: string = 'validation.error'
  static readonly VALIDATION_ERROR: string = 'validation.error '
  static readonly UNAUTHORIZED: string = 'unauthorized.error '
  static readonly INVALID_CREDENTIALS: string = 'invalid-credentials.error'
  static readonly INVALID_TOKEN: string = 'invalid-token.ts'
  static readonly METHOD_NOT_ALLOWED: string = 'method-not-allower.error'
  static readonly INVALID_CREDENTIALS_OR_TOKEN: string =
    'invalid-credentials-or-token.error'
}
