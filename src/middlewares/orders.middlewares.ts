import { checkSchema } from 'express-validator'
import { ORDER_MESSAGE } from '~/constants/message.js'
import { validate } from '~/utils/validation.js'

export const createOrderValidator = validate(
  checkSchema({
    total_amount: {
      isFloat: {
        options: {
          min: 1
        },
        errorMessage: ORDER_MESSAGE.ORDER_TOTAL_AMOUNT_MORE_THAN_ONE
      }
    },
    dishes: {
      isArray: {
        options: { min: 1 },
        errorMessage: ORDER_MESSAGE.ORDER_DISHES_0
      }
    }
  })
)
