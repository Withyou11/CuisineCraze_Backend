import { ObjectId } from 'mongodb'
import { TableStatus } from '~/constants/enum.js'

interface TableType {
  _id?: ObjectId
  table_number: string
  capacity: number
  status: TableStatus
}

export default class Table {
  _id?: ObjectId
  table_number: string
  capacity: number
  status: TableStatus
  constructor(table: TableType) {
    this._id = table._id
    this.table_number = table.table_number
    this.capacity = table.capacity
    this.status = table.status || TableStatus.Available
  }
}
