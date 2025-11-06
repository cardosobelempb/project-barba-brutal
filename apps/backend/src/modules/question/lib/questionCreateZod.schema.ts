import { stringZodSchema } from 'src/shared/schemas/stringZod.shema'
import { z } from 'zod'

// Corrigido nome do arquivo

/**
 * Schema de validação para criação de question.
 * Composto por schemas reutilizáveis de campos individuais.
 */
export const questionCreateZodSchema = z.object({
  title: stringZodSchema,
  content: stringZodSchema,
})

/**
 * Tipo inferido a partir do schema de cadastro.
 * Pode ser usado para tipar body de requisição, formulários, etc.
 */
export type QuestionCreateZodSchema = z.infer<typeof questionCreateZodSchema>
