import { Request, Response, NextFunction, Handler } from 'express'

import { HttpRequest, HttpResponse } from '@/shared/types'

type Controller = (httpRequest: HttpRequest) => Promise<HttpResponse>

export function adaptToExpressRoute(controller: Controller): Handler {
  return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { headers, statusCode, data }: HttpResponse = await controller(request)
      const requestId = request.headers['x-request-id']
      if (requestId) {
        response.setHeader('x-request-id', requestId)
      }
      if (headers) {
        Object.entries(headers).forEach(([key, value]) => response.appendHeader(key, value))
      }
      response.status(statusCode).json(data)
    } catch (error) {
      next(error)
    }
  }
}
