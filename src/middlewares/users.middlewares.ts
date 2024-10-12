import { checkSchema } from 'express-validator'
import { USER_MESSAGE } from '~/constants/message.js'
import databaseService from '~/services/database.services.js'
import usersService from '~/services/users.services.js'
import { hashPassword } from '~/utils/crypto.js'
import { validate } from '~/utils/validation.js'

export const loginValidator = validate(
  checkSchema({
    email: {
      isEmail: {
        errorMessage: USER_MESSAGE.EMAIL_IS_INVALID
      },
      trim: true,
      custom: {
        options: async (value, { req }) => {
          const user = await databaseService.users.findOne({ email: value, password: hashPassword(req.body.password) })
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
  })
)

export const registerValidator = validate(
  checkSchema({
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
  })
)
