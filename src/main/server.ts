import serverless from 'serverless-http'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import '@/main/dependency-injection'

import { env } from '@/shared/config'
import { routes } from '@/main/routes'
import { handleErrors, handleRouteNotFound } from '@/main/middlewares'
import { prismaDBClient } from '@/infra/databases'

export const server = express()
export const handler = serverless(server)
export const DBClient = prismaDBClient

server.use(express.json())
server.use(helmet())
server.use(cors({ origin: env.CORS_ORIGIN }))

server.use('/api/v1', routes)
server.use(handleErrors)
server.use(handleRouteNotFound)
