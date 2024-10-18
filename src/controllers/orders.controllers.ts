import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { HTTP_STATUS } from '~/constants/httpStatus.js'
import { ORDER_MESSAGE } from '~/constants/message.js'
import ordersServices from '~/services/orders.services.js'

export const createOrderController = async (req: Request, res: Response) => {
  const result = await ordersServices.createOrder(req.body)
  res.status(HTTP_STATUS.success.OK).json({
    message: ORDER_MESSAGE.CREATE_ORDER_SUCCESS,
    result
  })
}

export const getAllOrdersController = async (req: Request, res: Response) => {
  const result = await ordersServices.getAllOrders()
  res.status(HTTP_STATUS.success.OK).json({
    message: ORDER_MESSAGE.GET_ORDERS_SUCCESS,
    result
  })
}
