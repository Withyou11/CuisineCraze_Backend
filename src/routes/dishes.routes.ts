import { Router } from 'express'
import {
  createDishController,
  getAllDishControllers,
  getAvailableDishesControllers,
  getDishByCategoryControllers,
  getDishByIdControllers,
  updateDishController
} from '~/controllers/dishes.controllers.js'
import { createDishValidator, updateDishValidator } from '~/middlewares/dishes.middlewares.js'
import { authorizeManager } from '~/middlewares/roles.middlewares.js'
import { wrapRequestHandler } from '~/utils/handlers.js'

const dishesRouter = Router()

dishesRouter.use((req, res, next) => {
  next()
})

/**
 * Description. Manager creates new dish
 * Path: /create-dish
 * Method: POST
 * Body: { name: string, description: string, price: number, status: DishStatus, type: DisCategory }
 */

dishesRouter.post('/create-dish', createDishValidator, authorizeManager, wrapRequestHandler(createDishController))

/**
 * Description. Manager updates a dish
 * Path: /update-dish
 * Method: POST
 * Body: { name: string, description: string, price: number, status: DishStatus, type: DisCategory }
 */

dishesRouter.patch('/update-dish', updateDishValidator, authorizeManager, wrapRequestHandler(updateDishController))

/**
 * Description. Get all dishes
 * Path: /get-all-dishes
 * Method: GET
 */

dishesRouter.get('/get-all-dishes', wrapRequestHandler(getAllDishControllers))

/**
 * Description. Get detail a dish
 * Path: /get-dish/:id
 * Method: GET
 */

dishesRouter.get(`/get-dish/:id`, wrapRequestHandler(getDishByIdControllers))

/**
 * Description. Get dishes by category
 * Path: /get-dish-category/:id
 * Method: GET
 */

dishesRouter.get(`/get-dish-category/:category`, wrapRequestHandler(getDishByCategoryControllers))

/**
 * Description. Get available dishes
 * Path: /get-available-dishes
 * Method: GET
 */

dishesRouter.get(`/get-available-dishes`, wrapRequestHandler(getAvailableDishesControllers))
export default dishesRouter
