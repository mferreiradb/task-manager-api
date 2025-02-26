import { Prisma } from '@prisma/client'

import { DBClient } from '@/main/server'
import { TaskRepository } from '@/infra/repositories/task'
import { Task } from '@/domain/entities'
import { NotFoundError } from '@/shared/errors'

export class TaskPrismaRepository implements TaskRepository {
  async create(data: TaskRepository.CreateData): Promise<Task> {
    const createdTask = await DBClient.task.create({ data })
    return new Task(createdTask)
  }

  async getMany(query?: TaskRepository.GetQuery): Promise<Task[]> {
    const whereConditions: Prisma.TaskWhereInput = {}
    if (query?.search) {
      whereConditions.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ]
    }
    if (query?.dueDate) {
      whereConditions.dueDate = this.getDateRangeFilter(query.dueDate)
    }
    if (query?.priority) {
      whereConditions.priority = query.priority
    }
    if (query?.status) {
      whereConditions.status = query.status
    }

    const tasks = await DBClient.task.findMany({
      where: whereConditions,
    })

    return tasks.map((task) => new Task(task))
  }

  async getOne(taskId: string): Promise<Task | null> {
    const task = await DBClient.task.findUnique({ where: { id: taskId } })
    if (!task) throw new NotFoundError('Task not found')
    return new Task(task)
  }

  async update(data: TaskRepository.UpdateData): Promise<Task> {
    const updatedTask = await DBClient.task.update({
      where: { id: data.id },
      data,
    })
    return new Task(updatedTask)
  }

  async delete(taskId: string): Promise<void> {
    await DBClient.task.delete({ where: { id: taskId } })
  }

  private getDateRangeFilter(date: Date): { gte: Date; lt: Date } {
    const startOfDay = new Date(date.toDateString())
    const endOfDay = new Date(startOfDay)
    endOfDay.setDate(startOfDay.getDate() + 1)

    return { gte: startOfDay, lt: endOfDay }
  }
}
