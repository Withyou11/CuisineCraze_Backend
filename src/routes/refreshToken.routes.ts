import { Router } from 'express'
import { createAccessTokenController } from '~/controllers/refresh_token.controllers.js'
import { refreshTokenValidator } from '~/middlewares/users.middlewares.js'
import { wrapRequestHandler } from '~/utils/handlers.js'

const refreshTokenRouter = Router()

refreshTokenRouter.use((req, res, next) => {
  next()
})

/**
 * Description.
 * Path: /
 * Method: POST
 * Body: {refresh_token: string}
 */

refreshTokenRouter.post('/', refreshTokenValidator, wrapRequestHandler(createAccessTokenController))

export default refreshTokenRouter
