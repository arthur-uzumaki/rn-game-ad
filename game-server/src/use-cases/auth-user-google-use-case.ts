import { prisma } from '@/lib/prisma'
import type { FastifyInstance } from 'fastify'
import z from 'zod'

interface AuthUserGoogleUseCaseRequest {
  access_token: string
}

interface AuthUserGoogleUseCaseResponse {
  token: string
}

export class AuthUserGoogleUseCase {
  constructor(private readonly fastifyToken: FastifyInstance) {}

  async execute({
    access_token,
  }: AuthUserGoogleUseCaseRequest): Promise<AuthUserGoogleUseCaseResponse> {
    const userResponse = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
    const userData = await userResponse.json()

    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url(),
    })

    const userInfo = userInfoSchema.parse(userData)
    let user = await prisma.user.findUnique({
      where: {
        googleId: userInfo.id,
      },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          avatarUrl: userInfo.picture,
        },
      })
    }

    const token = this.fastifyToken.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: user.id,
        expiresIn: '7 days',
      }
    )

    return { token }
  }
}
