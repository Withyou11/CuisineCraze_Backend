import { ObjectId } from 'mongodb'
import { DishStatus, DishCategory } from '~/constants/enum.js'

interface DishType {
  _id?: ObjectId
  name: string
  description: string
  price: number
  status: DishStatus
  type: DishCategory
}

export default class Dish {
  _id?: ObjectId
  name: string
  description?: string
  price: number
  status: DishStatus
  type: DishCategory
  constructor(dish: DishType) {
    this._id = dish._id
    this.name = dish.name
    this.description = dish.description
    this.price = dish.price
    this.status = dish.status || DishStatus.Available
    this.type = dish.type || DishCategory.Appetizers
  }
}
