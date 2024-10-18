import databaseService from './database.services.js'
import { config } from 'dotenv'
import { ObjectId } from 'mongodb'
import { CreateDiscountReqBody, UpdateDiscountReqBody } from '~/models/requests/Discount.request.js'
import Discount from '~/models/schemas/Discount.schema.js'

config()

class DiscountsServices {
  async checkDiscountExist(code: string) {
    const discount = await databaseService.discounts.findOne({ code })
    return Boolean(discount)
  }

  async checkDiscountValidate(code: string) {
    const discount = await databaseService.discounts.findOne({ code })

    if (!discount) {
      return { error: 'Invalid discount code', is_valid: false }
    }

    const currentDate = new Date()
    if (discount.start_date && discount.start_date > currentDate) {
      return { error: 'Discount code is not yet valid', is_valid: false }
    }

    if (discount.end_date && discount.end_date < currentDate) {
      return { error: 'Discount code has expired', is_valid: false }
    }

    return {
      is_valid: true,
      _id: discount._id,
      discount_percentage: discount.discount_percentage,
      code: discount.code
    }
  }

  async getAllDiscount() {
    const discounts = await databaseService.discounts.find().toArray()
    return discounts
  }

  async createDiscount(payload: CreateDiscountReqBody) {
    await databaseService.discounts.insertOne(new Discount({ ...payload, number_of_use: 0 }))
  }

  async updateDiscount(payload: UpdateDiscountReqBody) {
    const updateFields: any = { ...payload }

    if (payload.code) updateFields.code = payload.code
    if (payload.description) updateFields.description = payload.description
    if (payload.discount_percentage) updateFields.discount_percentage = payload.discount_percentage
    if (payload.image) updateFields.image = payload.image
    if (payload.number_of_use) updateFields.number_of_use = payload.number_of_use
    if (payload.status) updateFields.status = payload.status
    if (payload.start_date) updateFields.start_date = payload.start_date
    if (payload.end_date) updateFields.end_date = payload.end_date

    delete updateFields._id
    await databaseService.discounts.updateOne(
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

const discountsServices = new DiscountsServices()
export default discountsServices
