import { TaskRepository } from '@/infra/repositories/task'
import { Task } from '@/domain/entities'

export namespace CreateTask {
  export type Input = {
    title: string
    description?: string | null
    dueDate?: Date | string | null
    priority: 'LOW' | 'MEDIUM' | 'HIGH'
    status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED'
  }
  export type Output = { taskId: string }
}

export class CreateTask {
  constructor(readonly taskRepository: TaskRepository) {}

  async execute(input: CreateTask.Input): Promise<CreateTask.Output> {
    const task = new Task(input)
    const createdTask = await this.taskRepository.create(task)
    return { taskId: createdTask.id }
  }
}
