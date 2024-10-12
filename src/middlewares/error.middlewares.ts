import { Request, Response, NextFunction } from 'express'
import omit from 'lodash'
import { HTTP_STATUS } from '~/constants/httpStatus.js'
import { ErrorWithStatus } from '~/models/Errors.js'

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const defaultErrorHandler = (error: any, req: Request, res: Response, next: NextFunction): void => {
  // Check if headers have already been sent
  if (res.headersSent) {
    return next(error) // Prevent sending another response
  }
  if (error instanceof ErrorWithStatus) {
    res.status(error.status).json(omit({ error, ...['status'] }))
    return
  }

  // Object.getOwnPropertyNames(error).forEach((key) => {
  //   Object.defineProperty(error, key, { enumerable: true })
  // })

  res.status(HTTP_STATUS.serverError.Internal_Server_Error).json({
    message: error.message,
    errorInfo: omit({ error, ...['stack'] })
  })
}
export default defaultErrorHandler
