import { Request, Response, NextFunction } from 'express'

import {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
} from '@/shared/errors'
import { responseHelper } from '@/shared/helpers'
import { logger } from '@/shared/utils'
import { HttpResponse } from '@/shared/types'

export function handleErrors(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  logger.error(error)
  let httpResponse: HttpResponse
  switch (true) {
    case error instanceof BadRequestError:
      httpResponse = responseHelper.badRequest(error)
      break
    case error instanceof UnauthorizedError:
      httpResponse = responseHelper.unauthorized(error)
      break
    case error instanceof ForbiddenError:
      httpResponse = responseHelper.forbidden(error)
      break
    case error instanceof NotFoundError:
      httpResponse = responseHelper.notFound(error)
      break
    case error instanceof ConflictError:
      httpResponse = responseHelper.conflict(error)
      break
    default:
      httpResponse = responseHelper.serverError(error)
      break
  }
  response.status(httpResponse.statusCode).json(httpResponse.data)
}
