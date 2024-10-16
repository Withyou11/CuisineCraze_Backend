import { checkSchema, ParamSchema } from 'express-validator'
import { DISH_MESSAGE } from '~/constants/message.js'
import dishesServices from '~/services/dishes.services.js'
import { validate } from '~/utils/validation.js'

const dishesNameSchema: ParamSchema = {
  trim: true,
  notEmpty: {
    errorMessage: DISH_MESSAGE.DISH_NAME_IS_REQUIRED
  },
  isString: {
    errorMessage: DISH_MESSAGE.DISH_NAME_IS_STRING
  },
  isLength: {
    options: {
      min: 2,
      max: 255
    },
    errorMessage: DISH_MESSAGE.DISH_NAME_LENGTH
  },
  custom: {
    options: async (value) => {
      const isExistDish = await dishesServices.checkDishExist(value)
      if (isExistDish) {
        throw new Error(DISH_MESSAGE.DISH_NAME_EXISTS)
      }
      return true
    }
  }
}

const descriptionSchema: ParamSchema = {
  optional: true,
  isLength: {
    options: {
      max: 255
    },
    errorMessage: DISH_MESSAGE.DISH_DESCRIPTION_LENGTH
  }
}

const priceSchema: ParamSchema = {
  notEmpty: {
    errorMessage: DISH_MESSAGE.DISH_PRICE_REQUIRED
  },
  isNumeric: {
    errorMessage: DISH_MESSAGE.DISH_PRICE_NUMBER
  }
}
export const createDishValidator = validate(
  checkSchema(
    {
      name: dishesNameSchema,
      price: priceSchema,
      description: descriptionSchema
    },
    ['body']
  )
)

export const updateDishValidator = validate(
  checkSchema(
    {
      name: {
        ...dishesNameSchema,
        optional: true,
        notEmpty: undefined
      },
      price: {
        ...priceSchema,
        optional: true,
        notEmpty: undefined
      },
      description: descriptionSchema
    },
    ['body']
  )
)
