import { Request, Response } from 'express'
import { HTTP_STATUS } from '~/constants/httpStatus.js'
import { signToken } from '~/utils/jwt.js'
import { TokenType } from '~/constants/enum.js'
import { ErrorWithStatus } from '~/models/Errors.js'
import { USER_MESSAGE } from '~/constants/message.js'
import databaseService from '~/services/database.services.js'

export const createAccessTokenController = async (req: Request, res: Response) => {
  try {
    // const { user_id, role, token_type } = req.decode_refresh_token

    if (req.decode_refresh_token?.token_type !== TokenType.RefreshToken) {
      throw new ErrorWithStatus({
        message: USER_MESSAGE.REFRESH_TOKEN_IS_INVALID,
        status: HTTP_STATUS.clientError.UNAUTHORIZED
      })
    }

    // Kiểm tra refresh token có tồn tại trong database không
    const refreshTokenInDB = await databaseService.refreshTokens.findOne({ token: req.body.refresh_token })
    if (!refreshTokenInDB) {
      throw new ErrorWithStatus({
        message: USER_MESSAGE.REFRESH_TOKEN_IS_INVALID,
        status: HTTP_STATUS.clientError.UNAUTHORIZED
      })
    }

    const accessToken = await signToken({
      payload: {
        user_id: req.decode_refresh_token?.user_id,
        role: req.decode_refresh_token?.role,
        token_type: process.env.AccessToken
      },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string,
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
    })
    console.log(accessToken)

    res.status(HTTP_STATUS.success.OK).json({
      access_token: accessToken
    })
  } catch (error) {
    res.status(HTTP_STATUS.serverError.Internal_Server_Error).json({
      message: 'Internal server error'
    })
  }
}
