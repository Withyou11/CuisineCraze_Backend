import { Request, Response } from 'express'
import { NextFunction, ParamsDictionary } from 'express-serve-static-core'
import usersService from '~/services/users.services.js'
import { RegisterReqBody } from '~/models/requests/User.request.js'

export const loginController = (req: Request, res: Response) => {
  res.json({
    message: 'Login successful'
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
    message: 'Register successful',
    result
  })
}
