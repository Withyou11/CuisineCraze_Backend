import { TableStatus } from '~/constants/enum.js'

export interface CreateTableReqBody {
  table_number: string
  capacity: number
  status: TableStatus
}
