import {
  type Controller, type AddAccount, type HttpRequest,
  type HttpResponse, MissingParamError, InvalidParamError,
  type EmailValidator, badRequest, serverError, created
} from './signup-protocols'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator, private readonly addAccount: AddAccount) {
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields: string[] = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) return badRequest(new InvalidParamError('passwordConfirmation'))
      const isValidEmail = this.emailValidator.isValid(email as string)
      if (!isValidEmail) return badRequest(new InvalidParamError('email'))
      const createdAccount = await this.addAccount.add({
        name,
        email,
        password
      })
      return created(createdAccount)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
