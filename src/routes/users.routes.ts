import { Router } from 'express'
import {
  emailVerifyTokenController,
  forgotPasswordController,
  getMeController,
  loginController,
  logoutController,
  registerController,
  resendEmailVerifyTokenController,
  resetPasswordController,
  verifyForgotPasswordController
} from '~/controllers/users.controllers.js'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  verifyForgotPasswordTokenValidator
} from '~/middlewares/users.middlewares.js'
import { wrapRequestHandler } from '~/utils/handlers.js'

const usersRouter = Router()

usersRouter.use((req, res, next) => {
  next()
})

/**
 * Description. Login a user
 * Path: /login
 * Method: POST
 * Body: { email: string, password: string}
 */

usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

/**
 * Description. Register a user
 * Path: /register
 * Method: POST
 * Body: {name: string, email: string, password: string, confirm_password: string}
 */
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

/**
 * Description. Logout a user
 * Path: /logout
 * Method: POST
 * Header: {Authorization: Bearer <access_token>}
 * Body: {refresh_token: string}
 */
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

/**
 * Description. Verify email when user clicks on the link in email
 * Path: /verify-email
 * Method: POST
 * Body: {email_verify_token: string}
 */
usersRouter.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(emailVerifyTokenController))

/**
 * Description. Resend Verify email when user clicks on the Resend button
 * Path: /resend-verify-email
 * Method: POST
 * Header: {Authorization: Bearer <access_token>}
 * Body: {}
 */
usersRouter.post('/resend-verify-email', accessTokenValidator, wrapRequestHandler(resendEmailVerifyTokenController))

/**
 * Description. User submits email to reset password, system sends email with a link to enter new password
 * Path: /forgot-password
 * Method: POST
 * Body: { email: string}
 */
usersRouter.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))

/**
 * Description. Verify link in email to reset password
 * Path: /verify-forgot-password
 * Method: POST
 * Body: { forgot_password_token: string}
 */
usersRouter.post(
  '/verify-forgot-password',
  verifyForgotPasswordTokenValidator,
  wrapRequestHandler(verifyForgotPasswordController)
)

/**
 * Description. Reset password
 * Path: /reset-password
 * Method: POST
 * Body: { forgot_password_token: string, password: string, confirm_password: string}
 */
usersRouter.post('/reset-password', resetPasswordValidator, wrapRequestHandler(resetPasswordController))

/**
 * Description. Get my profile
 * Path: /me
 * Method: GET
 * Headers: {Authorization: Bearer <access_token>}
 */
usersRouter.get('/me', accessTokenValidator, wrapRequestHandler(getMeController))

export default usersRouter
