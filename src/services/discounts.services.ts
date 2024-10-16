import databaseService from './database.services.js'
import { config } from 'dotenv'
import { ObjectId } from 'mongodb'
import { CreateDiscountReqBody } from '~/models/requests/Discount.request.js'
import Discount from '~/models/schemas/Discount.schema.js'

config()

class DiscountsServices {
  async checkDiscountExist(code: string) {
    const discount = await databaseService.discounts.findOne({ code })
    return Boolean(discount)
  }
  async createDiscount(payload: CreateDiscountReqBody) {
    await databaseService.discounts.insertOne(new Discount({ ...payload, number_of_use: 0 }))
  }
}

const discountsServices = new DiscountsServices()
export default discountsServices
