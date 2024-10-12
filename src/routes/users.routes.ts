import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers.js'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares.js'
import { wrapRequestHandler } from '~/utils/handlers.js'

const usersRouter = Router()

usersRouter.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

/**
 * Description. Register a user
 * Path: /register
 * Method: POST
 * Body: {name: string, email: string, password: string, confirm_password: string}
 */
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

export default usersRouter
