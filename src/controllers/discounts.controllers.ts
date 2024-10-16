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
