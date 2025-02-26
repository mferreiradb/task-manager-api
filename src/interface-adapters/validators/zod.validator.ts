import { ZodSchema } from 'zod'

import { BadRequestError } from '@/shared/errors'
import { Validator } from '@/interface-adapters/validators'

export class ZodValidator implements Validator {
  async validate<T>(schema: ZodSchema, data: T): Promise<T> {
    try {
      return schema.parse(data)
    } catch (error: any) {
      throw new BadRequestError(error.issues[0].message)
    }
  }
}
