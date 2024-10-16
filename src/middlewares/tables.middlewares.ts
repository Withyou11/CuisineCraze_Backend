import { checkSchema } from 'express-validator'
import { TABLE_MESSAGE } from '~/constants/message.js'
import tablesService from '~/services/tables.services.js'
import { validate } from '~/utils/validation.js'

export const createTableValidator = validate(
  checkSchema({
    table_number: {
      trim: true,
      notEmpty: {
        errorMessage: TABLE_MESSAGE.TABLE_NUMBER_IS_REQUIRED
      },
      custom: {
        options: async (value) => {
          const isExistTable = await tablesService.checkTableExist(value)
          if (isExistTable) {
            throw new Error(TABLE_MESSAGE.TABLE_NUMBER_EXISTS)
          }
          return true
        }
      }
    }
  })
)
