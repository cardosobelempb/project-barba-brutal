import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export const createValidationError = (error: ZodError, target?: string) => ({
  statusCode: 400,
  message: 'Validation failed',
  error: 'Bad Request',
  details: fromZodError(error),
  target, // Ajuda a identificar se é body, query ou param
})
