export type HttpRequest = {
  params?: any
  query?: any
  body?: any
  headers?: any
}

export type HttpResponse = {
  statusCode: number
  data?: any
  headers?: Record<string, any>
}
