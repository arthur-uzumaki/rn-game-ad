import type { FastifyTypedInstance } from '@/@types/types'
import { authenticate } from '@/plugins/authenticate'
import z from 'zod'

export async function profile(app: FastifyTypedInstance) {
  app.get(
    '/me',
    {
      onRequest: [authenticate],
      schema: {
        tags: ['User'],
        description: 'fetch profile user',
        response: {
          200: z.object({
            user: z.object({
              sub: z.string(),
              name: z.string(),
              avatarUrl: z.string().optional(),
            }),
          }),
        },
      },
    },
    async request => {
      return { user: request.user }
    }
  )
}
