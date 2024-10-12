import { Request, Response, NextFunction } from 'express'
import omit from 'lodash'
import { HTTP_STATUS } from '~/constants/httpStatus.js'

export const defaultErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || HTTP_STATUS.serverError.Internal_Server_Error).json(omit({ error, ...['status'] }))
}
