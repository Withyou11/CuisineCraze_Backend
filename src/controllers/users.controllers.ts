import { Request, Response } from 'express'
import { NextFunction, ParamsDictionary } from 'express-serve-static-core'
import usersService from '~/services/users.services.js'
import { LogoutReqBody, RegisterReqBody } from '~/models/requests/User.request.js'
import { USER_MESSAGE } from '~/constants/message.js'
import { ObjectId } from 'mongodb'
import User from '~/models/schemas/User.schema.js'

export const loginController = async (req: Request, res: Response) => {
  const user = req.user as User
  const user_id = user._id as ObjectId
  const result = await usersService.login(user_id.toString())
  res.status(200).json({
    message: USER_MESSAGE.LOGIN_SUCCESSFUL,
    result
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, unknown, RegisterReqBody>,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const result = await usersService.register(req.body)
  res.status(200).json({
    message: USER_MESSAGE.REGISTER_SUCCESSFUL,
    result
  })
}

export const logoutController = async (req: Request<ParamsDictionary, unknown, LogoutReqBody>, res: Response) => {
  const { refresh_token } = req.body
  const result = await usersService.logout(refresh_token)
  res.status(200).json({
    result
  })
}
