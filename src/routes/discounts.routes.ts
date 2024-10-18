import { Router } from 'express'
import {
  applyDiscountController,
  createDiscountController,
  getAllDiscountController,
  updateDiscountController
} from '~/controllers/discounts.controllers.js'
import {
  applyDiscountValidator,
  createDiscountValidator,
  updateDiscountValidator
} from '~/middlewares/discounts.middlewares.js'

import { authorizeManager } from '~/middlewares/roles.middlewares.js'
import { wrapRequestHandler } from '~/utils/handlers.js'

const discountsRouter = Router()

discountsRouter.use((req, res, next) => {
  next()
})

/**
 * Description. Manager creates discount
 * Path: /create-discount
 * Method: POST
 * Body: { code: string, description: string, discount_percentage: number, start_date: Date, end_date: Date, image: string }
 */

discountsRouter.post(
  '/create-discount',
  createDiscountValidator,
  authorizeManager,
  wrapRequestHandler(createDiscountController)
)

/**
 * Description. Manager update discount
 * Path: /update-discount
 * Method: PATCH
 * Body: { code: string, description: string, discount_percentage: number, start_date: Date, end_date: Date, image: string }
 */

discountsRouter.patch(
  '/update-discount',
  updateDiscountValidator,
  authorizeManager,
  wrapRequestHandler(updateDiscountController)
)

/**
 * Description. Get all discounts
 * Path: /get-all-discount
 * Method: GET
 */

discountsRouter.get('/get-all-discounts', wrapRequestHandler(getAllDiscountController))

/**
 * Description.  apply discount
 * Path: /apply-discount
 * Method: GET
 * Body: { code: string, description: string, discount_percentage: number, start_date: Date, end_date: Date, image: string }
 */

discountsRouter.get('/apply-discount', applyDiscountValidator, wrapRequestHandler(applyDiscountController))

export default discountsRouter
