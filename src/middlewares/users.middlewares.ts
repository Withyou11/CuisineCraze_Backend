import { checkSchema } from 'express-validator'
import jwt from 'jsonwebtoken'
import { HTTP_STATUS } from '~/constants/httpStatus.js'
import { USER_MESSAGE } from '~/constants/message.js'
import { ErrorWithStatus } from '~/models/Errors.js'
import databaseService from '~/services/database.services.js'
import usersService from '~/services/users.services.js'
import { hashPassword } from '~/utils/crypto.js'
import { verifyToken } from '~/utils/jwt.js'
import { validate } from '~/utils/validation.js'
import { Request } from 'express'

export const loginValidator = validate(
  checkSchema(
    {
      email: {
        isEmail: {
          errorMessage: USER_MESSAGE.EMAIL_IS_INVALID
        },
        trim: true,
        custom: {
          options: async (value, { req }) => {
            const user = await databaseService.users.findOne({
              email: value,
              password: hashPassword(req.body.password)
            })
            if (user == null) {
              throw new Error(USER_MESSAGE.USER_NOT_FOUND)
            }
            req.user = user
            return true
          }
        }
      },
      password: {
        isString: {
          errorMessage: USER_MESSAGE.PASSWORD_MUST_BE_STRING
        },
        isLength: {
          options: {
            min: 6,
            max: 50
          },
          errorMessage: USER_MESSAGE.PASSWORD_LENGTH
        },
        isStrongPassword: {
          options: {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minSymbols: 1,
            minNumbers: 1
          },
          errorMessage: USER_MESSAGE.PASSWORD_STRONG
        }
      }
    },
    ['body']
  )
)

export const registerValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: {
          errorMessage: USER_MESSAGE.EMAIL_IS_REQUIRED
        },
        isString: {
          errorMessage: USER_MESSAGE.NAME_MUST_BE_STRING
        },
        isLength: {
          options: {
            min: 1,
            max: 100
          },
          errorMessage: USER_MESSAGE.NAME_LENGTH
        },
        trim: true
      },
      email: {
        notEmpty: {
          errorMessage: USER_MESSAGE.EMAIL_IS_REQUIRED
        },
        isEmail: {
          errorMessage: USER_MESSAGE.EMAIL_IS_INVALID
        },
        trim: true,
        custom: {
          options: async (value) => {
            const isExistEmail = await usersService.checkEmailExist(value)
            if (isExistEmail) {
              throw new Error(USER_MESSAGE.EMAIL_ALREADY_EXIST)
            }
            return true
          }
        }
      },
      password: {
        notEmpty: {
          errorMessage: USER_MESSAGE.PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: USER_MESSAGE.PASSWORD_MUST_BE_STRING
        },
        isLength: {
          options: {
            min: 6,
            max: 50
          },
          errorMessage: USER_MESSAGE.PASSWORD_LENGTH
        },
        isStrongPassword: {
          options: {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minSymbols: 1,
            minNumbers: 1
          },
          errorMessage: USER_MESSAGE.PASSWORD_STRONG
        }
      },
      confirm_password: {
        notEmpty: {
          errorMessage: USER_MESSAGE.CONFIRM_PASSWORD_REQUIRED
        },
        isString: {
          errorMessage: USER_MESSAGE.CONFIRM_PASSWORD_MUST_BE_STRING
        },
        custom: {
          options: (value, { req }) => {
            if (value !== req.body.password) {
              throw new Error(USER_MESSAGE.CONFIRM_PASSWORD_MATCHED)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const accessTokenValidator = validate(
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

export const refreshTokenValidator = validate(
  checkSchema(
    {
      refresh_token: {
        trim: true,
        isString: true,
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new ErrorWithStatus({
                message: USER_MESSAGE.REFRESH_TOKEN_IS_REQUIRED,
                status: HTTP_STATUS.clientError.UNAUTHORIZED
              })
            }
            try {
              const [decode_refresh_token, refresh_token] = await Promise.all([
                verifyToken({ token: value, secretOrPublicKey: process.env.JWT_SECRET_REFRESH_TOKEN as string }),
                databaseService.refreshTokens.findOne({ token: value })
              ])
              if (refresh_token === null) {
                throw new ErrorWithStatus({
                  message: USER_MESSAGE.USED_REFRESH_TOKEN_OR_NOT_EXIST,
                  status: HTTP_STATUS.clientError.UNAUTHORIZED
                })
              }
              ;(req as Request).decode_refresh_token = decode_refresh_token
            } catch (err) {
              if (err instanceof jwt.JsonWebTokenError) {
                throw new ErrorWithStatus({
                  message: USER_MESSAGE.REFRESH_TOKEN_IS_INVALID,
                  status: HTTP_STATUS.clientError.UNAUTHORIZED
                })
              }
              throw err
            }

            return true
          }
        }
      }
    },
    ['body']
  )
)

export const emailVerifyTokenValidator = validate(
  checkSchema(
    {
      email_verify_token: {
        trim: true,

        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new ErrorWithStatus({
                message: USER_MESSAGE.EMAIL_VERIFY_TOKEN_IS_REQUIRED,
                status: HTTP_STATUS.clientError.UNAUTHORIZED
              })
            }

            try {
              const decode_email_verify_token = await verifyToken({
                token: value,
                secretOrPublicKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string
              })
              ;(req as Request).decode_email_verify_token = decode_email_verify_token
            } catch (err) {
              throw new ErrorWithStatus({
                message: USER_MESSAGE.EMAIL_VERIFY_TOKEN_IS_INVALID,
                status: HTTP_STATUS.clientError.UNAUTHORIZED
              })
            }

            return true
          }
        }
      }
    },
    ['body']
  )
)
