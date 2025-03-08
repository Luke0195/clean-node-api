import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helpers'
import env from './config/env'

MongoHelper.connect(env.mongoUrl).then(async (response) => {
  const app = (await import('./config/app')).default
  app.listen(env.port, () => {
    console.log(`server runing at: http://localhost:${env.port}`)
  })
}).catch((error) => {
  console.log('Não foi possível realizar a conexão com o banco')
  console.log(error)
})
