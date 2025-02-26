import { execSync } from 'child_process'
import { GenericContainer, StartedTestContainer } from 'testcontainers'

import { env } from '@/shared/config'
import { logger } from '@/shared/utils'

type ContainerInfo = {
  name: string
  image: string
  port: number
  env?: Record<string, any>
}

let startedContainers: StartedTestContainer[]

export async function setup(): Promise<void> {
  if (process.env.TEST_TYPE === 'unit') {
    return
  }
  logger.info('Setting up test environment...')
  const pgConnectionEnv = {
    POSTGRES_USER: env.TC_POSTGRES_USER,
    POSTGRES_PASSWORD: env.TC_POSTGRES_PASSWORD,
    POSTGRES_DB: env.TC_POSTGRES_DB,
  }
  const containersInfo: ContainerInfo[] = [
    {
      image: env.TC_POSTGRES_IMAGE!,
      name: env.TC_POSTGRES_NAME!,
      port: env.TC_POSTGRES_PORT!,
      env: pgConnectionEnv,
    },
  ]
  startedContainers = await startContainers(containersInfo)
  const postgresContainer = startedContainers.find((container) =>
    container.getName().includes(`${env.TC_POSTGRES_DB}_test`),
  )
  if (!postgresContainer) throw new Error('Postgres container not found')
  const port = postgresContainer.getMappedPort(5432)
  const host = postgresContainer.getHost()
  const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = pgConnectionEnv
  process.env.DATABASE_URL = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${host}:${port}/${POSTGRES_DB}?schema=public`
  execSync('npm run prisma:migrate')
  execSync('npm run prisma:generate')
}

export async function teardown(): Promise<void> {
  if (process.env.TEST_TYPE === 'unit' || !startedContainers || startedContainers.length === 0) {
    return
  }
  await stopContainers(startedContainers)
}

async function startContainers(containersInfo: ContainerInfo[]): Promise<StartedTestContainer[]> {
  const startedContainers = await Promise.all(
    containersInfo.map(async ({ image, name, port, env }) => {
      return await new GenericContainer(image)
        .withName(name)
        .withExposedPorts(port)
        .withEnvironment(env ?? {})
        .start()
    }),
  )
  return startedContainers
}

async function stopContainers(containers: StartedTestContainer[]): Promise<void> {
  for (const container of containers) {
    await container.stop()
  }
}
