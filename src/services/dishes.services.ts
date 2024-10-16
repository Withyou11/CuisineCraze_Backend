import databaseService from './database.services.js'
import { config } from 'dotenv'
import { ObjectId } from 'mongodb'
import { DishCategory } from '~/constants/enum.js'
import { CreateDishReqBody, UpdateDishReqBody } from '~/models/requests/Dish.request.js'
import Dish from '~/models/schemas/Dish.schema.js'

config()

class DishesServices {
  async checkDishExist(name: string) {
    const dish = await databaseService.dishes.findOne({ name })
    return Boolean(dish)
  }

  async getAllDishes() {
    const dishes = await databaseService.dishes.find().toArray()
    return dishes
  }

  async getDetailDish(_id: ObjectId) {
    const dish = await databaseService.dishes.findOne({ _id })
    return dish
  }

  async getDishesByCategory(category: DishCategory) {
    const dishes = await databaseService.dishes.find({ type: category }).toArray()
    return dishes
  }

  async getAvailableDishes() {
    const dishes = await databaseService.dishes.find({ status: 0 }).toArray()
    return dishes
  }

  async createDish(payload: CreateDishReqBody) {
    await databaseService.dishes.insertOne(new Dish(payload))
  }

  async updateDish(payload: UpdateDishReqBody) {
    const updateFields: any = { ...payload }

    if (payload.name) updateFields.name = payload.name
    if (payload.description) updateFields.description = payload.description
    if (payload.price !== undefined) updateFields.price = payload.price
    if (payload.status) updateFields.status = payload.status
    if (payload.type) updateFields.type = payload.type

    console.log(payload)

    delete updateFields._id
    await databaseService.dishes.updateOne(
      { _id: new ObjectId(payload._id) },
      {
        $set: {
          ...updateFields
        },
        $currentDate: {
          updated_at: true
        }
      }
    )
  }
}

const dishesServices = new DishesServices()
export default dishesServices
