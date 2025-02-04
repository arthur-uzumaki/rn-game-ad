import type { FastifyTypedInstance } from '@/@types/types'
import { authenticate } from '@/plugins/authenticate'
import { FetchAdDiscordUseCase } from '@/use-cases/fetch-ad-discord-use-case'
import z from 'zod'

export async function fetchAdDiscordRoute(app: FastifyTypedInstance) {
  app.get(
    '/ads/:adId/discord',
    {
      onRequest: [authenticate],
      schema: {
        tags: ['Game'],
        description: 'fetch the Discord username associated with a specific ad',
        params: z.object({
          adId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { adId } = request.params

      const fetchAdDiscordUseCase = new FetchAdDiscordUseCase()

      const result = await fetchAdDiscordUseCase.execute({ adId })

      const { discord } = result

      return reply.status(201).send({ discord })
    }
  )
}
