import { LogControllerDecoration } from './log'
import { type HttpRequest, type HttpResponse, type Controller } from '../../presentation/protocols'

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          success: true
        }
      }
      return await new Promise((resolve) => resolve(httpResponse))
    }
  }
  return new ControllerStub()
}

interface SutTypes {
  sut: LogControllerDecoration
  controllerStub: Controller
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const sut = new LogControllerDecoration(controllerStub)
  return {
    controllerStub,
    sut
  }
}
describe('LogDecorator', () => {
  test('Should calls controller handle ', async () => {
    const { controllerStub, sut } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
