import { prisma } from '@/lib/prisma'

interface FetchAdDiscordUseCaseRequest {
  adId: string
}

interface FetchAdDiscordUseCaseResponse {
  discord: string
}

export class FetchAdDiscordUseCase {
  async execute({
    adId,
  }: FetchAdDiscordUseCaseRequest): Promise<FetchAdDiscordUseCaseResponse> {
    const ad = await prisma.ad.findUniqueOrThrow({
      select: {
        discord: true,
      },
      where: {
        id: adId,
      },
    })

    return { discord: ad.discord }
  }
}
