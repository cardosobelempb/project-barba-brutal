import { z } from "zod";

export const nameZodSchema = z.string()
  .min(2, 'O nome deve ter pelo menos 2 caracteres')
  .max(100, 'O nome é muito longo')
