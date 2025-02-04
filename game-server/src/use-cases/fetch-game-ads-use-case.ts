import { prisma } from '@/lib/prisma'
import { convertHourStringToMinutes } from '@/utils/convert-hour-string-to-minutes'
import { convertMinutesToHourString } from '@/utils/convert-minutes-to-hour-string'

interface FetchGameAdsUseCaseRequest {
  gameId: string
}

export class FetchGameAdsUseCase {
  async execute({ gameId }: FetchGameAdsUseCaseRequest) {
    const ads = await prisma.ad.findMany({
      select: {
        id: true,
        name: true,
        weekDays: true,
        useVoiceChannel: true,
        yearsPlaying: true,
        hourStart: true,
        hourEnd: true,
      },

      where: {
        gameId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return ads.map(ad => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      }
    })
  }
}
