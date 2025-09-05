import { FieldMessage } from './field-message.error'
import { StandardError } from './standard-error.error'

export class ValidationError extends StandardError {
  private erros: FieldMessage[] = []

  constructor(
    timestamp: Date,
    status: number,
    error: string,
    message: string,
    path: string,
  ) {
    super(timestamp, status, error, message, path)
  }

  addErros(fieldName: string, message: string): void {
    this.erros.push(new FieldMessage(fieldName, message))
  }

  getErros(): FieldMessage[] {
    return this.erros
  }
}

// const valid = new ValidationError(
//   new Date(),
//   400,
//   'Validation Error',
//   'Invalid data',
//   '/api/items',
// )
// valid.addErros('name', 'Name is required')
// valid.addErros('email', 'Email is invalid')

// console.log(valid.getErros())
// console.log(valid)
// console.log(valid.getErros().map(error => error.message))
