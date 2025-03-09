export class ServerError extends Error {
  constructor (stack: string) {
    super('Internal Server Error')
    this.name = 'InternalServerError'
    this.stack = stack
  }
}
