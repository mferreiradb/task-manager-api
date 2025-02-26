import { HttpResponse } from '@/shared/types'
import { ServerError } from '@/shared/errors'

const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  data: {
    name: error.name,
    message: error.message,
  },
})

const unauthorized = (error: Error): HttpResponse => ({
  statusCode: 401,
  data: {
    name: error.name,
    message: error.message,
  },
})

const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  data: {
    name: error.name,
    message: error.message,
  },
})

const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  data: {
    name: error.name,
    message: error.message,
  },
})

const conflict = (error: Error): HttpResponse => ({
  statusCode: 409,
  data: {
    name: error.name,
    message: error.message,
  },
})

const serverError = (error: Error): HttpResponse => {
  const customError = new ServerError(error.stack)
  return {
    statusCode: 500,
    data: {
      name: customError.name,
      message: customError.message,
    },
  }
}

const ok = (data: unknown, headers?: Record<string, string>): HttpResponse => ({
  statusCode: 200,
  data,
  headers,
})

const created = (data: unknown): HttpResponse => ({
  statusCode: 201,
  data,
})

const noContent = (): HttpResponse => ({
  statusCode: 204,
  data: null,
})

export const responseHelper = {
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  serverError,
  ok,
  created,
  noContent,
}
