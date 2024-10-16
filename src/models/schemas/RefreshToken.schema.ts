import { ObjectId } from 'mongodb'
import { UserRole } from '~/constants/enum.js'

interface RefreshTokenType {
  _id?: ObjectId
  token: string
  created_at?: Date
  user_id: ObjectId
  role: UserRole
}

export default class RefreshToken {
  _id?: ObjectId
  token: string
  created_at: Date
  user_id: ObjectId
  role: UserRole

  constructor({ _id, token, created_at, user_id, role }: RefreshTokenType) {
    this._id = _id
    this.token = token
    this.created_at = created_at || new Date()
    this.user_id = user_id
    this.role = role || UserRole.Customer
  }
}
