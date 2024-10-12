import { HTTP_STATUS } from '~/constants/httpStatus.js'
import { USER_MESSAGE } from '~/constants/message.js'

type ErrorType = Record<
  string,
  {
    msg: string
    [key: string]: any
  }
>
export class ErrorWithStatus {
  message: string
  status: number
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
}

export class EntityError extends ErrorWithStatus {
  errors: ErrorType
  constructor({ message = USER_MESSAGE.VALIDATION_ERROR, errors }: { message?: string; errors: ErrorType }) {
    super({ message, status: HTTP_STATUS.clientError.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}
