import { HttpRequest, HttpResponse } from '@/shared/types'
import { responseHelper } from '@/shared/helpers'
import { di } from '@/shared/utils'

import {
  CreateUpdateTaskBodySchema,
  CreateUpdateTaskBody,
} from '@/interface-adapters/validators/schemas'
import { Validator } from '@/interface-adapters/validators'
import { CreateTask, UpdateTask, DeleteTask } from '@/application/use-cases/tasks'

export async function handleCreateTask(request: HttpRequest): Promise<HttpResponse> {
  const validator = di.resolve<Validator>('Validator')
  const validatedBody = await validator.validate<CreateUpdateTaskBody>(
    CreateUpdateTaskBodySchema,
    request.body,
  )
  const createTask = di.resolve<CreateTask>('CreateTask')
  const data = await createTask.execute(validatedBody)
  return responseHelper.created(data)
}

export async function handleUpdateTask(request: HttpRequest): Promise<HttpResponse> {
  const taskId = request.params.id
  const validator = di.resolve<Validator>('Validator')
  const validatedBody = await validator.validate<CreateUpdateTaskBody>(
    CreateUpdateTaskBodySchema,
    request.body,
  )
  const updateTask = di.resolve<UpdateTask>('UpdateTask')
  await updateTask.execute({
    taskId,
    body: validatedBody,
  })
  return responseHelper.noContent()
}

export async function handleDeleteTask(request: HttpRequest): Promise<HttpResponse> {
  const taskId = request.params.id
  const deleteTask = di.resolve<DeleteTask>('DeleteTask')
  await deleteTask.execute({ taskId })
  return responseHelper.noContent()
}
