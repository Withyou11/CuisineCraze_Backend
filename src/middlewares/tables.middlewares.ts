import { checkSchema, ParamSchema } from 'express-validator'
import { TABLE_MESSAGE } from '~/constants/message.js'
import tablesService from '~/services/tables.services.js'
import { validate } from '~/utils/validation.js'

const tableNameSchema: ParamSchema = {
  trim: true,
  notEmpty: {
    errorMessage: TABLE_MESSAGE.TABLE_NUMBER_IS_REQUIRED
  },
  isString: {
    errorMessage: TABLE_MESSAGE.TABLE_NAME_IS_STRING
  },
  isLength: {
    options: {
      min: 2,
      max: 10
    },
    errorMessage: TABLE_MESSAGE.TABLE_NAME_LENGTH
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

const capacity: ParamSchema = {
  isEmpty: {
    errorMessage: TABLE_MESSAGE.CAPACITY_IS_REQUIRED
  },
  isNumeric: {
    errorMessage: TABLE_MESSAGE.CAPACITY_IS_NUMBER
  }
}

export const createTableValidator = validate(
  checkSchema(
    {
      table_number: tableNameSchema,
      capacity: capacity
    },
    ['body']
  )
)

export const updateTableValidator = validate(
  checkSchema(
    {
      table_number: {
        ...tableNameSchema,
        optional: true,
        notEmpty: undefined
      },
      capacity: {
        ...capacity,
        optional: true,
        notEmpty: undefined
      }
    },
    ['body']
  )
)
