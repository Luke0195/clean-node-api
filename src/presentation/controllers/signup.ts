import { type HttpRequest, type HttpResponse, type Controller, type EmailValidator } from '../protocols'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { InvalidParamError } from '../errors'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields: string[] = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
    }
    const isValidEmail = this.emailValidator.isValid(httpRequest.body.email as string)
    if (!isValidEmail) return badRequest(new InvalidParamError('email'))
  }
}
