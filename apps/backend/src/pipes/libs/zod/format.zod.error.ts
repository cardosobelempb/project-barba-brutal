import { ZodError } from "zod";

// ✅ Função auxiliar para montar o formato do erro
export function formatZodError(error: ZodError, source?: string) {
  return {
    message: 'Validation failed',
    source,
    errors: error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    })),
  }
}
