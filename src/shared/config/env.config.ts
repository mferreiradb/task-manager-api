import { z } from 'zod'
import { config } from 'dotenv'

config()
const isTestEnv = process.env.NODE_ENV === 'test'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z
    .string()
    .regex(/^[0-9]+$/)
    .transform(Number),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']),
  CORS_ORIGIN: z.string(),
  CLOUD_ENVIRONMENT: z.enum(['local', 'dev', 'test', 'uat', 'staging', 'prod']),
  HEALTH_BUILD: z.string().optional(),
  HEALTH_RELEASE: z.string().optional(),
  DATABASE_URL: z.string().url(),
  DATABASE_PRISMA_BINARY_TARGETS: z.string(),
  TC_POSTGRES_IMAGE: isTestEnv ? z.string() : z.string().optional(),
  TC_POSTGRES_NAME: isTestEnv ? z.string() : z.string().optional(),
  TC_POSTGRES_PORT: isTestEnv
    ? z
        .string()
        .regex(/^[0-9]+$/)
        .transform(Number)
    : z
        .string()
        .regex(/^[0-9]+$/)
        .transform(Number)
        .optional(),
  TC_POSTGRES_USER: isTestEnv ? z.string() : z.string().optional(),
  TC_POSTGRES_PASSWORD: isTestEnv ? z.string() : z.string().optional(),
  TC_POSTGRES_DB: isTestEnv ? z.string() : z.string().optional(),
})

const envServer = envSchema.safeParse(process.env)
if (!envServer.success) {
  throw new Error(`ENV_ERROR: ${JSON.stringify(envServer.error)}`)
}

export const env = envServer.data
