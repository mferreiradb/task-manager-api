import { HttpRequest, HttpResponse } from '@/shared/types'
import { responseHelper } from '@/shared/helpers'
import { DBClient } from '@/main/server'

export async function checkServer(request: HttpRequest): Promise<HttpResponse> {
  const data = {
    build: process.env.HEALTH_BUILD ?? null,
    release: process.env.HEALTH_RELEASE ?? null,
    headers: request.headers,
  }
  return responseHelper.ok(data)
}

export async function checkDatabase(request: HttpRequest): Promise<HttpResponse> {
  const data = await DBClient.$queryRaw`SELECT NOW() AS time;`
  return responseHelper.ok(data)
}
