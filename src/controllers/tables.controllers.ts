import { Request, Response } from 'express'
import { HTTP_STATUS } from '~/constants/httpStatus.js'
import { TABLE_MESSAGE } from '~/constants/message.js'
import tablesService from '~/services/tables.services.js'

export const createTableController = async (req: Request, res: Response) => {
  const result = await tablesService.createTable(req.body)
  res.status(HTTP_STATUS.success.OK).json({
    message: TABLE_MESSAGE.CREATE_TABLE_SUCCESS,
    result
  })
}
