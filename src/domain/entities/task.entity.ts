import crypto from 'crypto'

namespace Task {
  export type Data = {
    id?: string
    title: string
    description?: string | null
    dueDate?: Date | string | null
    priority: 'LOW' | 'MEDIUM' | 'HIGH'
    status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED'
  }
}

export class Task {
  readonly id: string
  readonly title: string
  readonly description?: string | null
  readonly dueDate?: Date | string | null
  readonly priority: 'LOW' | 'MEDIUM' | 'HIGH'
  readonly status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED'

  constructor(taskData: Task.Data) {
    this.id = taskData?.id ?? crypto.randomUUID()
    this.title = taskData.title
    this.description = taskData.description
    this.dueDate = taskData.dueDate
    this.priority = taskData.priority
    this.status = taskData.status
  }
}
