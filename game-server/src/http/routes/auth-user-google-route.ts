import type { FastifyTypedInstance } from '@/@types/types'
import { AuthUserGoogleUseCase } from '@/use-cases/auth-user-google-use-case'
import z from 'zod'

export async function authUserGoogleRoute(app: FastifyTypedInstance) {
  app.post(
    '/sessions',
    {
      schema: {
        tags: ['User'],
        description: 'authenticate user google',
        body: z.object({
          idToken: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { idToken } = request.body

      const user = new AuthUserGoogleUseCase(app)

      const result = await user.execute({ access_token: idToken })

      const { token } = result

      return reply.status(201).send({ token })
    }
  )
}
