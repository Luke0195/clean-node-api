import request from 'supertest'
import app from '../config/app'
import { type Request, type Response } from 'express'

describe('Cors Middlewares', () => {
  test('Should enable Cors', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })

    await request(app).post('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*')
  })
})
