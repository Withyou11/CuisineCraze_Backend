import { ObjectId } from 'mongodb'
import { DiscountStatus } from '~/constants/enum.js'

interface DiscountType {
  _id?: ObjectId
  code: string
  description?: string
  discount_percentage: number
  image: string
  number_of_use: number
  status: DiscountStatus
  start_date: Date
  end_date: Date
}

export default class Discount {
  _id?: ObjectId
  code: string
  description?: string
  discount_percentage: number
  image: string
  number_of_use: number
  status: DiscountStatus
  start_date: Date
  end_date: Date

  constructor(discount: DiscountType) {
    this._id = discount._id
    this.code = discount.code
    this.description = discount.description
    this.discount_percentage = discount.discount_percentage
    this.image = discount.image
    this.number_of_use = discount.number_of_use
    this.status = discount.status | DiscountStatus.Enable
    this.start_date = discount.start_date
    this.end_date = discount.end_date
  }
}
