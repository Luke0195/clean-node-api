import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise((resolve, reject) => { resolve('hash_value') })
  }
}))

describe('BcryptAdapter', () => {
  test('Should returns Bcrypt with correct values ', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should returns a hash on success', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash_value')
  })

  test('Should throws if bcrypt throws', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    jest.spyOn(sut, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
