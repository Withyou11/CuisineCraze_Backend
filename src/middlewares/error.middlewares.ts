import { Request, Response, NextFunction } from 'express'
import omit from 'lodash'
import { HTTP_STATUS } from '~/constants/httpStatus.js'

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const defaultErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || HTTP_STATUS.serverError.Internal_Server_Error).json(omit({ error, ...['status'] }))
}
