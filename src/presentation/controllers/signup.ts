import { type HttpRequest, type HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/MissingParamError'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields: string[] = ['name', 'email', 'password']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
    }
  }
}
