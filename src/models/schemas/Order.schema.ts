import { ObjectId } from 'mongodb'
import { PaymentMethod } from '~/constants/enum.js'
import Table from './Table.schema.js'
import Dish from './Dish.schema.js'

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

interface OrderType {
  _id?: ObjectId
  total_amount: number
  payment_method: PaymentMethod
  discount: DiscountInfo
  table: Table
  staff_info: StaffInfo
  dishes: [DishInfo]
}

export default class Order {
  _id?: ObjectId
  total_amount: number
  payment_method: PaymentMethod
  discount: DiscountInfo
  table: Table
  staff_info: StaffInfo
  dishes: [DishInfo]

  constructor(order: OrderType) {
    this._id = order._id
    this.total_amount = order.total_amount
    this.payment_method = order.payment_method | PaymentMethod.Cash
    this.discount = order.discount
    this.table = order.table
    this.staff_info = order.staff_info
    this.dishes = order.dishes
  }
}
