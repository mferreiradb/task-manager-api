import { Request, Response, NextFunction } from 'express'

import { NotFoundError } from '@/shared/errors'
import { responseHelper } from '@/shared/helpers'

export function handleRouteNotFound(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  if (!request.route) {
    const httpResponse = responseHelper.notFound(new NotFoundError('Route not found'))
    response.status(httpResponse.statusCode).json(httpResponse.data)
  } else {
    next()
  }
}
