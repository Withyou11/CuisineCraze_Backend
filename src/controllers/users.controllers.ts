import { Request, Response } from 'express'
import { NextFunction, ParamsDictionary } from 'express-serve-static-core'
import usersService from '~/services/users.services.js'
import {
  LoginReqBody,
  LogoutReqBody,
  RegisterReqBody,
  TokenPayload,
  VerifyEmailReqBody
} from '~/models/requests/User.request.js'
import { USER_MESSAGE } from '~/constants/message.js'
import { ObjectId } from 'mongodb'
import User from '~/models/schemas/User.schema.js'
import databaseService from '~/services/database.services.js'
import { HTTP_STATUS } from '~/constants/httpStatus.js'
import { UserVerifyStatus } from '~/constants/enum.js'

export const loginController = async (req: Request<ParamsDictionary, unknown, LoginReqBody>, res: Response) => {
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
  res.status(HTTP_STATUS.success.OK).json({
    message: USER_MESSAGE.REGISTER_SUCCESSFUL,
    result
  })
}

export const logoutController = async (req: Request<ParamsDictionary, unknown, LogoutReqBody>, res: Response) => {
  const { refresh_token } = req.body
  const result = await usersService.logout(refresh_token)
  res.status(HTTP_STATUS.success.OK).json({
    result
  })
}

export const emailVerifyTokenController = async (
  req: Request<ParamsDictionary, unknown, VerifyEmailReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decode_email_verify_token as TokenPayload
  const user = await databaseService.users.findOne({
    _id: new ObjectId(user_id)
  })
  // If cant find user
  if (!user) {
    res.status(HTTP_STATUS.clientError.NOT_FOUND).json({
      message: USER_MESSAGE.USER_NOT_FOUND
    })
  }
  // Verified before => No errors, return status OK with message: is verified
  if (user?.email_verify_token === '') {
    res.json({
      message: USER_MESSAGE.EMAIL_VERIFIED
    })
  }

  const result = await usersService.verifyEmail(user_id)
  res.status(HTTP_STATUS.success.OK).json({
    message: USER_MESSAGE.EMAIL_VERIFIED_SUCCESS,
    result
  })
}

export const resendEmailVerifyTokenController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decode_authorization as TokenPayload
  const user = await databaseService.users.findOne({
    _id: new ObjectId(user_id)
  })
  if (!user) {
    res.status(HTTP_STATUS.clientError.NOT_FOUND).json({
      message: USER_MESSAGE.USER_NOT_FOUND
    })
  }

  if (user?.verify === UserVerifyStatus.Verified) {
    res.json({
      message: USER_MESSAGE.EMAIL_VERIFIED
    })
  }
  const result = await usersService.resendVerifyEmail(user_id)
  res.json(result)
}
