import { prisma } from '@/lib/prisma'

export class FetchGamesUseCase {
  async execute() {
    const games = await prisma.game.findMany({
      include: {
        _count: {
          select: {
            ads: true,
          },
        },
      },
    })

    return { games }
  }
}
