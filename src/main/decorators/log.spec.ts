import { LogControllerDecoration } from './log'
import { type HttpRequest, type HttpResponse, type Controller } from '../../presentation/protocols'
import { type LogErrorRepository } from '../../data/protocols/log-error-repository'
import { serverError } from '../../presentation/helpers/http-helper'
import { type AddAccountModel } from '../../domain/usecases/add-account'
import { type ServerError } from '../../presentation/errors'

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

interface AccountRequestData {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

const makeFakeAccount = (): AccountRequestData => ({
  name: 'any_name',
  email: 'any_mail@mail.com',
  password: 'any_password',
  passwordConfirmation: 'any_password'
})

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stack: string): Promise<void> {
      return await new Promise((resolve) => resolve())
    }
  }
  return new LogErrorRepositoryStub()
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: makeFakeAccount()
      }
      return await new Promise((resolve) => resolve(httpResponse))
    }
  }
  return new ControllerStub()
}

interface SutTypes {
  sut: LogControllerDecoration
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecoration(controllerStub, logErrorRepositoryStub)
  return {
    controllerStub,
    sut,
    logErrorRepositoryStub
  }
}
describe('LogDecorator', () => {
  test('Should calls controller handle ', async () => {
    const { controllerStub, sut } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = {
      body: makeFakeAccount()
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should returns the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: makeFakeAccount()
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: makeFakeAccount()
    })
  })

  test('Should calls LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, logErrorRepositoryStub, controllerStub } = makeSut()
    const error = makeFakeServerError()
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(error)))
    const httpRequest = {
      body: makeFakeAccount()
    }
    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
