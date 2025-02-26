import z from 'zod'

export const CreateUpdateTaskBodySchema = z.object({
  title: z.string({ message: 'Title is required and must be a string' }),
  description: z.string({ message: 'Description must be a string' }).nullable().optional(),
  dueDate: z.string().pipe(z.coerce.date()).nullable().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'COMPLETED']),
})

export const GetTasksQuerySchema = z.object({
  search: z.string().optional(),
  dueDate: z.string().pipe(z.coerce.date()).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'COMPLETED']).optional(),
})

export type CreateUpdateTaskBody = z.infer<typeof CreateUpdateTaskBodySchema>
export type CreateTaskQuery = z.infer<typeof GetTasksQuerySchema>
