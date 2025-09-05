export class StandardError {
  timestamp: Date
  status: number
  error: string
  message: string
  path: string

  constructor(
    timestamp: Date,
    status: number,
    error: string,
    message: string,
    path: string,
  ) {
    this.timestamp = timestamp
    this.status = status
    this.error = error
    this.message = message
    this.path = path
  }
}
