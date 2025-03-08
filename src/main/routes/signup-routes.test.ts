import request from 'supertest'
import app from '../config/app'

describe('SignUp Route', () => {
  test('Should returns an account on success', async () => {
    await request(app).post('/api/signup').send({
      name: 'Lucas',
      email: 'lucas201273@gmail.com',
      password: '123',
      passwordConfirmation: '123'
    }).expect(201)
  })
})
