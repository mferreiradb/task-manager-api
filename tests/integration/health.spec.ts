import { describe, it, expect } from 'vitest'
import supertest from 'supertest'

import { server } from '@/main/server'

describe('Health', async () => {
  const api = supertest(server)

  it('Should check server and return status 200 along with expected data', async () => {
    // ACT
    const getResponse = await api.get('/api/v1/health/server')

    // ASSERT
    expect(getResponse.status).toBe(200)
    expect(getResponse.body).toHaveProperty('build')
    expect(getResponse.body).toHaveProperty('release')
    expect(getResponse.body).toHaveProperty('headers')
  })

  it('Should check database and return 200 status along with the expected data', async () => {
    // ACT
    const getResponse = await api.get('/api/v1/health/database')

    // ASSERT
    expect(getResponse.status).toBe(200)
    expect(getResponse.body).toHaveLength(1)
    expect(getResponse.body[0]).toHaveProperty('time')
  })
})
