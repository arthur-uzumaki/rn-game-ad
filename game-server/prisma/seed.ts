import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const games = [
    {
      id: '1b15af7c-e9f4-4e82-8216-77190a884885',
      title: 'League of Legends',
      bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/21779-188x250.jpg',
    },
    {
      id: '4fa0efcb-2dc7-4d8b-a187-1120b2e4fc70',
      title: 'CS:GO',
      bannerUrl:
        'https://static-cdn.jtvnw.net/ttv-boxart/32399_IGDB-188x250.jpg',
    },
    {
      id: '5a0ad9f2-83e0-4131-92e9-58ce36db1740',
      title: 'Dota 2',
      bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/29595-285x380.jpg',
    },
    {
      id: 'dcef6f3a-8d2f-43df-8763-24c2cf647a11',
      title: 'World of Warcraft',
      bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/18122-285x380.jpg',
    },
    {
      id: 'f53de9c9-aeeb-4ab6-8694-04378e218679',
      title: 'Apex Legends',
      bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/511224-285x380.jpg',
    },
    {
      id: 'cd016da6-4306-445b-9264-d7f942068dc2',
      title: 'F1 2022',
      bannerUrl:
        'https://static-cdn.jtvnw.net/ttv-boxart/489490035_IGDB-285x380.jpg',
    },
  ]

  for (const game of games) {
    await prisma.game.upsert({
      where: { id: game.id },
      update: {},
      create: {
        id: game.id,
        title: game.title,
        bannerUrl: game.bannerUrl,
      },
    })
  }

  console.log('Seeding completed!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
