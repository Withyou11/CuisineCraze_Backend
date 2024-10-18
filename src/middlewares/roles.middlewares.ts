import { checkSchema } from 'express-validator'
import { HTTP_STATUS } from '~/constants/httpStatus.js'
import { ROLE_MESSAGE, USER_MESSAGE } from '~/constants/message.js'
import { ErrorWithStatus } from '~/models/Errors.js'
import { verifyToken } from '~/utils/jwt.js'
import { validate } from '~/utils/validation.js'
import { Request } from 'express'
import { UserRole } from '~/constants/enum.js'

// Authorization Manager
export const authorizeManager = validate(
  checkSchema(
    {
      Authorization: {
        trim: true,
        custom: {
          options: async (value: string, { req }) => {
            const access_token = (value || '').split(' ')[1]
            if (access_token === '') {
              throw new ErrorWithStatus({
                message: USER_MESSAGE.VALIDATION_ERROR,
                status: HTTP_STATUS.clientError.UNAUTHORIZED
              })
            }
            try {
              const decode_authorization = await verifyToken({
                token: access_token,
                secretOrPublicKey: process.env.JWT_SECRET_ACCESS_TOKEN as string
              })
              ;(req as Request).decode_authorization = decode_authorization
              if (decode_authorization.role !== UserRole.Manager) {
                throw new ErrorWithStatus({
                  message: ROLE_MESSAGE.CAN_NOT_DO_THIS_ACTION,
                  status: HTTP_STATUS.clientError.NOT_ACCEPTABLE
                })
              }
            } catch (err) {
              throw new ErrorWithStatus({
                message: USER_MESSAGE.ACCESS_TOKEN_IS_INVALID,
                status: HTTP_STATUS.clientError.UNAUTHORIZED
              })
            }

            return true
          }
        }
      }
    },
    ['headers']
  )
)

// Authorization Staff
export const authorizeStaff = validate(
  checkSchema(
    {
      Authorization: {
        trim: true,
        custom: {
          options: async (value: string, { req }) => {
            const access_token = (value || '').split(' ')[1]
            if (access_token === '') {
              throw new ErrorWithStatus({
                message: USER_MESSAGE.VALIDATION_ERROR,
                status: HTTP_STATUS.clientError.UNAUTHORIZED
              })
            }
            try {
              const decode_authorization = await verifyToken({
                token: access_token,
                secretOrPublicKey: process.env.JWT_SECRET_ACCESS_TOKEN as string
              })
              ;(req as Request).decode_authorization = decode_authorization
              if (decode_authorization.role !== UserRole.Staff) {
                throw new ErrorWithStatus({
                  message: ROLE_MESSAGE.CAN_NOT_DO_THIS_ACTION,
                  status: HTTP_STATUS.clientError.NOT_ACCEPTABLE
                })
              }
            } catch (err) {
              throw new ErrorWithStatus({
                message: USER_MESSAGE.ACCESS_TOKEN_IS_INVALID,
                status: HTTP_STATUS.clientError.UNAUTHORIZED
              })
            }

            return true
          }
        }
      }
    },
    ['headers']
  )
)
