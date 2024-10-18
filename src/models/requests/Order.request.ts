import { PaymentMethod } from '~/constants/enum.js'
import Table from '../schemas/Table.schema.js'
import { ObjectId } from 'mongodb'

interface StaffInfo {
  _id: ObjectId
  name: string
}

interface DiscountInfo {
  _id: ObjectId
  code: string
  discount_percentage: number
}

interface DishInfo {
  _id: ObjectId
  name: string
  price: number
  amount: number
}

export interface CreateOrderReqBody {
  total_amount: number
  payment_method: PaymentMethod
  discount: DiscountInfo
  table: Table
  staff_info: StaffInfo
  dishes: [DishInfo]
}
