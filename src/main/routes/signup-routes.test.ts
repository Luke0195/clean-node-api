import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helpers'

describe('SignUp Route', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URI)
  })

  beforeAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should returns an account on success', async () => {
    await request(app).post('/api/signup').send({
      name: 'Lucas',
      email: 'lucas201273@gmail.com',
      password: '123',
      passwordConfirmation: '123'
    }).expect(201)
  })
})
