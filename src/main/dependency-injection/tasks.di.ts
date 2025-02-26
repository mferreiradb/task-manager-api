import { di } from '@/shared/utils'

import { TaskPrismaRepository } from '@/infra/repositories/task'
import { CreateTask, UpdateTask, DeleteTask } from '@/application/use-cases/tasks'

di.register('TaskRepository', TaskPrismaRepository)
di.register('CreateTask', CreateTask, ['TaskRepository'])
di.register('UpdateTask', UpdateTask, ['TaskRepository'])
di.register('DeleteTask', DeleteTask, ['TaskRepository'])
