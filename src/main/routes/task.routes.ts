import { Router } from 'express'

import * as expressRouteAdapter from '@/main/routes/adapters'
import * as commandTaskController from '@/interface-adapters/commands/tasks/command-task.controller'
import * as queryTaskController from '@/interface-adapters/queries/tasks/query-task.controller'

export const taskRoutes = Router()

taskRoutes.post(
  '/tasks',
  expressRouteAdapter.adaptToExpressRoute(commandTaskController.handleCreateTask),
)

taskRoutes.get(
  '/tasks',
  expressRouteAdapter.adaptToExpressRoute(queryTaskController.handleGetTasks),
)

taskRoutes.get(
  '/tasks/:id',
  expressRouteAdapter.adaptToExpressRoute(queryTaskController.handleGetTask),
)

taskRoutes.put(
  '/tasks/:id',
  expressRouteAdapter.adaptToExpressRoute(commandTaskController.handleUpdateTask),
)

taskRoutes.delete(
  '/tasks/:id',
  expressRouteAdapter.adaptToExpressRoute(commandTaskController.handleDeleteTask),
)
