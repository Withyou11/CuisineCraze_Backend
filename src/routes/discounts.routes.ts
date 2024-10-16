import { Router } from 'express'
import { createDiscountController } from '~/controllers/discounts.controllers.js'
import { createDiscountValidator } from '~/middlewares/discounts.middlewares.js'

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

export default discountsRouter
