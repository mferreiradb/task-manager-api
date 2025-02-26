import { Task } from '@/domain/entities'

export namespace TaskRepository {
  export type CreateData = Task
  export interface GetQuery {
    search?: string
    dueDate?: Date
    priority?: 'LOW' | 'MEDIUM' | 'HIGH'
    status?: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED'
  }
  export type UpdateData = Task
}

export interface TaskRepository {
  create: (task: TaskRepository.CreateData) => Promise<Task>
  getMany: (query?: TaskRepository.GetQuery) => Promise<Task[]>
  getOne: (taskId: string) => Promise<Task | null>
  update: (data: TaskRepository.UpdateData) => Promise<Task>
  delete: (taskId: string) => Promise<void>
}
