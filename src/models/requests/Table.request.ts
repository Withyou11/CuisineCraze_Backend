import { ObjectId } from 'mongodb'
import { TableStatus } from '~/constants/enum.js'

export interface CreateTableReqBody {
  table_number: string
  capacity: number
  status: TableStatus
}
export interface UpdateTableReqBody {
  _id: ObjectId
  table_number: string
  capacity: number
  status: TableStatus
}
