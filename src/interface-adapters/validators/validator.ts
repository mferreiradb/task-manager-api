export interface Validator {
  validate: <T>(schema: any, data: T) => Promise<T>
}
