import { PrismaClient } from '@prisma/client'

const { NODE_ENV, DATABASE_URL } = process.env

export const prismaDBClient: PrismaClient = new PrismaClient({
  datasources: { db: { url: `${DATABASE_URL}` } },
  log: NODE_ENV !== 'production' ? [{ emit: 'stdout', level: 'query' }] : [],
})
