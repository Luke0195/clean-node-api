import { MONGO_HELPER } from '../helpers/mongo-helpers'
import { AccountMongoRepository } from './account'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MONGO_HELPER.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MONGO_HELPER.disconnect()
  })

  test('Should returns an account on success', async () => {
    const sut = new AccountMongoRepository()
    const account = await sut.add({ name: 'any_name', email: 'any_mail@mail.com', password: 'any_password' })
    console.error(account)
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_mail@mail.com')
    expect(account.password).toBe('any_password')
  })
})
