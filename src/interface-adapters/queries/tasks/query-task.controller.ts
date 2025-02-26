import { HttpRequest, HttpResponse } from '@/shared/types'
import { responseHelper } from '@/shared/helpers'
import { di } from '@/shared/utils'

import { GetTasksQuerySchema, CreateTaskQuery } from '@/interface-adapters/validators/schemas'
import { Validator } from '@/interface-adapters/validators'
import { TaskRepository } from '@/infra/repositories/task'

export async function handleGetTasks(request: HttpRequest): Promise<HttpResponse> {
  const validator = di.resolve<Validator>('Validator')
  const validatedQuery = await validator.validate<CreateTaskQuery>(
    GetTasksQuerySchema,
    request.query,
  )
  const taskRepository = di.resolve<TaskRepository>('TaskRepository')
  const data = await taskRepository.getMany(validatedQuery)
  const headers = { 'Cache-Control': 'private, max-age=60' }
  return responseHelper.ok(data, headers)
}

export async function handleGetTask(request: HttpRequest): Promise<HttpResponse> {
  const taskId = request.params.id
  const taskRepository = di.resolve<TaskRepository>('TaskRepository')
  const data = await taskRepository.getOne(taskId)
  return responseHelper.ok(data)
}
