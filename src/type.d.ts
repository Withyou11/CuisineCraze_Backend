import User from './models/schemas/User.schema.ts'
declare module 'express' {
  interface Request {
    user?: User
  }
}
