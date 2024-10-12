import { TokenPayload } from './models/requests/User.request.ts'
import User from './models/schemas/User.schema.ts'
declare module 'express' {
  interface Request {
    user?: User
    decode_authorization?: TokenPayload
    decode_refresh_token?: TokenPayload
  }
}
