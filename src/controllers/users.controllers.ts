import { Request, Response } from 'express'
import databaseService from '~/services/database.services.js'
import { ParamsDictionary } from 'express-serve-static-core'
import User from '~/models/schemas/User.schema.js'
import usersService from '~/services/users.services.js'
import { RegisterReqBody } from '~/models/requests/User.request.js'

export const loginController = (req: Request, res: Response) => {
  res.json({
    message: 'Login successful'
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  try {
    const result = await usersService.register(req.body)
    res.status(200).json({
      message: 'Register successful',
      result
    })
  } catch (error) {
    console.error('Registration error: ', error)
    res.status(400).json({
      message: 'Register failed'
    })
  }
}
