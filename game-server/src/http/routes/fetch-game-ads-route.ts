import type { FastifyTypedInstance } from '@/@types/types'
import { authenticate } from '@/plugins/authenticate'
import { FetchGameAdsUseCase } from '@/use-cases/fetch-game-ads-use-case'
import z from 'zod'

export async function fetchGameAdsRoute(app: FastifyTypedInstance) {
  app.get(
    '/games/:gameId/ads',
    {
      onRequest: [authenticate],
      schema: {
        tags: ['Game'],
        description: 'fetch the game associated with a specific ad',
        params: z.object({
          gameId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { gameId } = request.params

      const fetchGameAdsUseCase = new FetchGameAdsUseCase()
      const result = await fetchGameAdsUseCase.execute({ gameId })

      return reply.status(201).send({ ads: result })
    }
  )
}
