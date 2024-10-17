import { TokenPayload } from './models/requests/User.request.ts'
import User from './models/schemas/User.schema.ts'
declare module 'express' {
  interface Request {
    user?: User
    decode_authorization?: TokenPayload
    decode_refresh_token?: TokenPayload
    decode_email_verify_token?: TokenPayload
    decode_forgot_password_token?: TokenPayload
    discount_percentage?: number
  }
}
