import { ObjectId } from 'mongodb'
import { DishCategory, DishStatus } from '~/constants/enum.js'

export interface CreateDishReqBody {
  _id?: ObjectId
  name: string
  description: string
  price: number
  image: string
  status: DishStatus
  type: DishCategory
}

export interface UpdateDishReqBody {
  _id?: ObjectId
  name?: string
  description?: string
  price?: number
  image: string
  status?: DishStatus
  type?: DishCategory
}
