import { type LogErrorRepository } from '../../data/protocols/log-error-repository'
import { type Controller, type HttpRequest, type HttpResponse } from '../../presentation/protocols'

export class LogControllerDecoration implements Controller {
  constructor (private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
