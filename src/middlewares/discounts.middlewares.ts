import { checkSchema, ParamSchema } from 'express-validator'
import { DISCOUNT_MESSAGE } from '~/constants/message.js'
import discountsServices from '~/services/discounts.services.js'
import { validate } from '~/utils/validation.js'
import { Request } from 'express'

const codeSchema: ParamSchema = {
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
}

const discountPercentageSchema: ParamSchema = {
  isInt: {
    options: {
      min: 1,
      max: 100
    },
    errorMessage: DISCOUNT_MESSAGE.DISCOUNT_PERCENTAGE_VALIDATION
  }
}

const startDateSchema: ParamSchema = {
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
}

const endDateSchema: ParamSchema = {
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
export const createDiscountValidator = validate(
  checkSchema(
    {
      code: codeSchema,
      discount_percentage: discountPercentageSchema,
      start_date: startDateSchema,
      end_date: endDateSchema
    },
    ['body']
  )
)

export const updateDiscountValidator = validate(
  checkSchema(
    {
      code: {
        ...codeSchema,
        optional: true
      },
      discount_percentage: {
        ...discountPercentageSchema,
        optional: true
      },
      start_date: { ...startDateSchema, optional: true },
      end_date: { ...endDateSchema, optional: true }
    },
    ['body']
  )
)

export const applyDiscountValidator = validate(
  checkSchema({
    code: {
      in: ['query'],
      custom: {
        options: async (value, { req }) => {
          const isValidateDiscount = await discountsServices.checkDiscountValidate(value)
          if (!isValidateDiscount.is_valid) {
            throw new Error(DISCOUNT_MESSAGE.DISCOUNT_CODE_WRONG)
          }
          req.discount_percentage = isValidateDiscount.discount_percentage
          req.code = isValidateDiscount.code
          req._id = isValidateDiscount._id
          return true
        }
      }
    }
  })
)
