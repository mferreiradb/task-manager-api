import { TaskRepository } from '@/infra/repositories/task'

export namespace DeleteTask {
  export type Input = {
    taskId: string
  }
  export type Output = void
}

export class DeleteTask {
  constructor(readonly taskRepository: TaskRepository) {}

  async execute(input: DeleteTask.Input): Promise<DeleteTask.Output> {
    await this.taskRepository.delete(input.taskId)
  }
}
