import type { FastifyTypedInstance } from '@/@types/types'
import { authenticate } from '@/plugins/authenticate'
import { FetchGamesUseCase } from '@/use-cases/fetch-games-use-case'
import z from 'zod'

export async function fetchGamesRoute(app: FastifyTypedInstance) {
  app.get(
    '/games',
    {
      onRequest: [authenticate],
      schema: {
        tags: ['Game'],
        description: 'Fetch all games',
      },
    },
    async (_, reply) => {
      const game = new FetchGamesUseCase()

      const result = await game.execute()

      const { games } = result
      return reply.status(200).send({ games })
    }
  )
}
