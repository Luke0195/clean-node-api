import { MongoHelper } from '../helpers/mongo-helpers'
import { LogMongoRepository } from '../log-repository/log-repository'

describe('Log Error Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should create an errorLog on success', async () => {
    const sut = new LogMongoRepository()
    await sut.logError('any_error')
    const errorsCollection = await MongoHelper.getCollection('errors')
    const count = await errorsCollection.countDocuments()
    expect(count).toBe(1)
  })
})
