import { z } from "zod";


export const phoneZodSchema = z.string()
  .regex(
    /^(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/,
    'Número de telefone inválido'
  )

