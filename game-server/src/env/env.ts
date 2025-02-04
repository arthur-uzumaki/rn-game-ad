import z from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().min(1).url(),
  POSTGRES_USER: z.string().min(1),
  POSTGRES_PASSWORD: z.string().min(1),
  POSTGRES_DB: z.string().min(1),
  PORT: z.coerce.number().positive().default(3333),
  JWT_SECRET: z.string().min(1),
})

export const env = envSchema.parse(process.env)
