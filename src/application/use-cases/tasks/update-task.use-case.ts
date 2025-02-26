import { TaskRepository } from '@/infra/repositories/task'
import { Task } from '@/domain/entities'

export namespace UpdateTask {
  export type Input = {
    taskId: string
    body: {
      title: string
      description?: string | null
      dueDate?: Date | string | null
      priority: 'LOW' | 'MEDIUM' | 'HIGH'
      status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED'
    }
  }
  export type Output = void
}

export class UpdateTask {
  constructor(readonly taskRepository: TaskRepository) {}

  async execute(input: UpdateTask.Input): Promise<UpdateTask.Output> {
    const task = new Task({ id: input.taskId, ...input.body })
    await this.taskRepository.update(task)
  }
}
