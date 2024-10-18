import databaseService from './database.services.js'
import { config } from 'dotenv'
import { CreateOrderReqBody } from '~/models/requests/Order.request.js'
import Order from '~/models/schemas/Order.schema.js'

config()

class OrdersServices {
  async getAllOrders() {
    const orders = await databaseService.orders.find().toArray()
    return orders
  }

  async createOrder(payload: CreateOrderReqBody) {
    await databaseService.orders.insertOne(new Order(payload))
  }
}

const ordersServices = new OrdersServices()
export default ordersServices
