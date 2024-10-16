import { checkSchema } from 'express-validator'
import { DISCOUNT_MESSAGE } from '~/constants/message.js'
import discountsServices from '~/services/discounts.services.js'
import { validate } from '~/utils/validation.js'

export const createDiscountValidator = validate(
  checkSchema(
    {
      code: {
        isString: true,
        isLength: {
          options: {
            min: 2,
            max: 20
          },
          errorMessage: DISCOUNT_MESSAGE.DISCOUNT_CODE_LENGTH
        },
        custom: {
          options: async (value) => {
            const isExistDiscount = await discountsServices.checkDiscountExist(value)
            if (isExistDiscount) {
              throw new Error(DISCOUNT_MESSAGE.DISCOUNT_NAME_EXIST)
            }
            return true
          }
        }
      },
      discount_percentage: {
        isInt: {
          options: {
            min: 1,
            max: 100
          },
          errorMessage: DISCOUNT_MESSAGE.DISCOUNT_PERCENTAGE_VALIDATION
        }
      },
      start_date: {
        isISO8601: {
          errorMessage: DISCOUNT_MESSAGE.START_DATE_ISO8601
        },
        toDate: true,
        custom: {
          options: (value) => {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            if (value < today) {
              throw new Error(DISCOUNT_MESSAGE.START_DATE_GREATER)
            }
            return true
          }
        }
      },
      end_date: {
        isISO8601: {
          errorMessage: DISCOUNT_MESSAGE.END_DATE_ISO8601
        },
        toDate: true,
        custom: {
          options: (value, { req }) => {
            if (req.body.start_date && value < req.body.start_date) {
              throw new Error(DISCOUNT_MESSAGE.END_DATE_GREATER)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
