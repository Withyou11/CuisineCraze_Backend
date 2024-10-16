import { checkSchema, ParamSchema } from 'express-validator'
import { TABLE_MESSAGE } from '~/constants/message.js'
import tablesService from '~/services/tables.services.js'
import { validate } from '~/utils/validation.js'

const tableNameSchema: ParamSchema = {
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

export const createTableValidator = validate(
  checkSchema({
    table_number: tableNameSchema
  })
)

export const updateTableValidator = validate(
  checkSchema({
    // table_number: tableNameSchema
  })
)
