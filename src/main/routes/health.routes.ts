import { Router } from 'express'

import * as expressRouteAdapter from '@/main/routes/adapters'
import * as queryHealthController from '@/interface-adapters/queries/health/query-health.controller'

export const healthRoutes = Router()

healthRoutes.get(
  '/health/server',
  expressRouteAdapter.adaptToExpressRoute(queryHealthController.checkServer),
)

healthRoutes.get(
  '/health/database',
  expressRouteAdapter.adaptToExpressRoute(queryHealthController.checkDatabase),
)
