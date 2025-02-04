import { z } from 'zod'

const envSchema = z.object({
  EXPO_PUBLIC_CLIENT_ID_ANDROID: z.string(),
  EXPO_PUBLIC_CLIENT_ID_IOS: z.string(),
  EXPO_PUBLIC_WEB_CLIENT_ID: z.string(),
})

export const env = envSchema.parse(process.env)
