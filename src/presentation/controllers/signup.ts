import { type HttpRequest, type HttpResponse, type Controller, type EmailValidator } from '../protocols'
import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields: string[] = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
      }
      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) return badRequest(new InvalidParamError('passwordConfirmation'))

      const isValidEmail = this.emailValidator.isValid(httpRequest.body.email as string)
      if (!isValidEmail) return badRequest(new InvalidParamError('email'))
    } catch (error) {
      return serverError()
    }
  }
}
