import z from "zod"

/**
 * Schema para validação de data de nascimento.
 * - Deve estar no passado
 * - Pode ter idade mínima (ex: 18 anos)
 */
export const birthdateZodSchema = z
  .string()
  .refine((dateStr) => !isNaN(Date.parse(dateStr)), {
    message: 'Data inválida.',
  })
  .refine((dateStr) => {
    const today = new Date()
    const birth = new Date(dateStr)
    return birth < today
  }, {
    message: 'A data de nascimento deve estar no passado.',
  })
  .refine((dateStr) => {
    const birth = new Date(dateStr)
    const today = new Date()
    const age = today.getFullYear() - birth.getFullYear()
    return age >= 18
  }, {
    message: 'É necessário ter pelo menos 18 anos.',
  })

export type BirthdateZodDTO = z.infer<typeof birthdateZodSchema>;
