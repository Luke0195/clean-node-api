import { type HttpRequest } from '../../presentation/protocols'
import { type Controller } from '../../presentation/protocols/controller'
import { type Request, type Response } from 'express'

export const adapteRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body
    }
    const httpResponse = await controller.handle(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
