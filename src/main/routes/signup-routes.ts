import { type Router } from 'express'
import { makeSignUpController } from '../factories/signup-factory'
import { adapteRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/signup', adapteRoute(makeSignUpController()))
}
