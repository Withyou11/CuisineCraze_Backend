import { Router } from 'express'
import { createOrderController, getAllOrdersController } from '~/controllers/orders.controllers.js'
import { createOrderValidator } from '~/middlewares/orders.middlewares.js'
import { authorizeManager, authorizeStaff } from '~/middlewares/roles.middlewares.js'
import { wrapRequestHandler } from '~/utils/handlers.js'

const ordersRouter = Router()

ordersRouter.use((req, res, next) => {
  next()
})

/**
 * Description. Staff creates new order
 * Path: /create-order
 * Method: POST
 * Body: { total_amount: number, dishes: [DishInfo], payment_method: PaymentMethod, discount: DiscountInfo, staff_info: StaffInfo, table: Table}
 */

ordersRouter.post('/create-order', createOrderValidator, authorizeStaff, wrapRequestHandler(createOrderController))

/**
 * Description. Manager gets all orders
 * Path: /get-all-orders
 * Method: GET
 */

ordersRouter.get('/get-all-orders', authorizeManager, wrapRequestHandler(getAllOrdersController))

export default ordersRouter
