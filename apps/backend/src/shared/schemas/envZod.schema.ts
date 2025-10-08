import { z } from 'zod'

/**
 * Schema de validação das variáveis de ambiente.
 * Utiliza coercion para permitir entrada de strings (ex: via `.env`)
 * e define valores padrão onde aplicável.
 */
export const envZodSchema = z.object({
  // URL base da aplicação (ex: http://localhost:3000)
  // PREFIX_URL: z.url(),
  FRONTEND_URL: z.url(),

  NODE_ENV: z.string().default("development"),

  // Config JWT
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  JWT_EXPIRES_IN: z.string(),
  JWT_SECRET: z.string(),
  JWT_ACCESS_TOKEN_SECRET: z.string(),
  JWT_ACCESS_TOKEN_EXPIRATION: z.string().default("15m"),
  JWT_REFRESH_TOKEN_SECRET: z.string(),
  JWT_REFRESH_TOKEN_EXPIRATION: z.string().default("7d"),

  // Config MAIL
  MAIL_HOST: z.string().default("smtp.mailtrap.io"),
  MAIL_PORT: z.coerce.number().default(587),
  MAIL_USER: z.string().default("myemailuser"),
  MAIL_PASSWORD: z.string().default("myemailpassword"),

  // Conexão com o banco de dados
  DATABASE_URL: z.url(),

  // Chaves JWT para autenticação
  // JWT_PRIVATE_KEY: z.string(),
  // JWT_PUBLIC_KEY: z.string(),

  // Integração com serviços externos
  // CLOUDFLARE_ACCOUNT_ID: z.string(),

  // Credenciais AWS S3
  // AWS_BUCKET_NAME: z.string(),
  // AWS_ACCESS_KEY_ID: z.string(),
  // AWS_SECRET_ACCESS_KEY: z.string(),

  // Configuração do Redis (opcional, com valores padrão)
  // REDIS_HOST: z.string().default('127.0.0.1'),
  // REDIS_PORT: z.coerce.number().default(6379),
  // REDIS_DB: z.coerce.number().default(0),

  // Porta da aplicação (opcional, default: 4000)
  PORT: z.coerce.number().default(4000),
})

/**
 * Tipo inferido a partir do schema Zod.
 * Útil para tipar objetos validados ou o processo de configuração.
 */
export type EnvZod = z.infer<typeof envZodSchema>
