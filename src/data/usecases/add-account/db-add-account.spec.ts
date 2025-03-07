import { DbAddAccount } from './db-add-acount'
import { type Encrypter } from '../../protocols/encrypter'

describe('DbAddAccount Use Case', () => {
  test('Should call encrypter with correct password', async () => {
    class EncrypterStub implements Encrypter {
      async encrypt (value: string): Promise<string> {
        return await new Promise((resolve) => { resolve('hashed_password') })
      }
    }
    const encryptStub = new EncrypterStub()
    const accountData = {
      name: 'valid_name',
      email: 'valid_mail@mail.com',
      password: 'valid_password'
    }
    const encryptSpy = jest.spyOn(encryptStub, 'encrypt')
    const sut = new DbAddAccount(encryptStub)

    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
