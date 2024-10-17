import { Request, Response } from 'express'
import { HTTP_STATUS } from '~/constants/httpStatus.js'
import { DISCOUNT_MESSAGE } from '~/constants/message.js'
import discountsServices from '~/services/discounts.services.js'

export const createDiscountController = async (req: Request, res: Response) => {
  const result = await discountsServices.createDiscount(req.body)
  res.status(HTTP_STATUS.success.OK).json({
    message: DISCOUNT_MESSAGE.CREATE_DISCOUNT_SUCCESS,
    result
  })
}

export const updateDiscountController = async (req: Request, res: Response) => {
  const result = await discountsServices.updateDiscount(req.body)
  res.status(HTTP_STATUS.success.OK).json({
    message: DISCOUNT_MESSAGE.UPDATE_DISCOUNT_SUCCESS,
    result
  })
}

export const getAllDiscountController = async (req: Request, res: Response) => {
  const result = await discountsServices.getAllDiscount()
  res.status(HTTP_STATUS.success.OK).json({
    message: DISCOUNT_MESSAGE.GET_ALL_DISCOUNT_SUCCESS,
    result
  })
}

export const applyDiscountController = (req: Request, res: Response) => {
  const discountPercentage = req.discount_percentage
  res.json({
    success: true,
    discount_percentage: discountPercentage
  })
}
