import pino from 'pino'
import pretty from 'pino-pretty'

// import { env } from '@/shared/config'

// export const logger =
//   env.NODE_ENV === 'test'
//     ? pino(
//         pretty({
//           colorize: true,
//           translateTime: true,
//           ignore: 'pid,hostname',
//         }),
//       )
//     : pino({
//         level: env.LOG_LEVEL,
//         transport: {
//           target: 'pino-http-print',
//           options: {
//             destination: 1,
//             all: true,
//             colorize: true,
//             translateTime: true,
//           },
//         },
//         redact: {
//           paths: ['password'],
//           censor: '**GDPR COMPLIANT**',
//         },
//       })

export const logger = pino(
  pretty({
    colorize: true,
    translateTime: true,
    ignore: 'pid,hostname',
  }),
)
