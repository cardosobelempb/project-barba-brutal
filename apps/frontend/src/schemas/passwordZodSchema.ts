import { z } from "zod";

export const passwordZodSchema = z.string().min(5, {
  message: "Password must be at least 5 characters.",
});
