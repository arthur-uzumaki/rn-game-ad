import fastify from 'fastify'
import { fastifyJwt } from '@fastify/jwt'
import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'

import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { authUserGoogleRoute } from './routes/auth-user-google-route'
import { profile } from './routes/profile'
import { fetchGamesRoute } from './routes/fetch-games-route'
import { fetchGameAdsRoute } from './routes/fetch-game-ads-route'
import { fetchAdDiscordRoute } from './routes/fetch-ad-discord-route'
import { env } from '@/env/env'
import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Ads games server',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors, {
  origin: '*',
})

app.register(authUserGoogleRoute)
app.register(profile)
app.register(fetchGamesRoute)
app.register(fetchGameAdsRoute)
app.register(fetchAdDiscordRoute)

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('Server  running http://localhost:3333')
})

app.ready().then(() => {
  const spec = app.swagger()

  writeFile(
    resolve(process.cwd(), 'swagger.json'),
    JSON.stringify(spec, null, 2),
    'utf-8'
  )
})
