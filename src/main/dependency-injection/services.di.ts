import { di } from '@/shared/utils'

import { ZodValidator } from '@/interface-adapters/validators'

di.register('Validator', ZodValidator)
