import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { DishCategory } from '~/constants/enum.js'
import { HTTP_STATUS } from '~/constants/httpStatus.js'
import { DISH_MESSAGE } from '~/constants/message.js'
import dishesServices from '~/services/dishes.services.js'

export const createDishController = async (req: Request, res: Response) => {
  const result = await dishesServices.createDish(req.body)
  res.status(HTTP_STATUS.success.OK).json({
    message: DISH_MESSAGE.CREATE_DISH_SUCCESS,
    result
  })
}

export const updateDishController = async (req: Request, res: Response) => {
  const result = await dishesServices.updateDish(req.body)
  res.status(HTTP_STATUS.success.OK).json({
    message: DISH_MESSAGE.UPDATE_DISH_SUCCESS,
    result
  })
}

export const getAllDishControllers = async (req: Request, res: Response) => {
  const result = await dishesServices.getAllDishes()
  res.status(HTTP_STATUS.success.OK).json({
    message: DISH_MESSAGE.GET_ALL_DISHES_SUCCESS,
    result
  })
}

export const getDishByIdControllers = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await dishesServices.getDetailDish(new ObjectId(id))
    res.status(HTTP_STATUS.success.OK).json({
      message: DISH_MESSAGE.GET_DISH_SUCCESS,
      result
    })
  } catch (err) {
    res.status(HTTP_STATUS.serverError.Internal_Server_Error).json({
      message: 'Error'
    })
  }
}

export const getDishByCategoryControllers = async (req: Request, res: Response) => {
  try {
    const { category } = req.params
    const categoryIndex = DishCategory[category as keyof typeof DishCategory]
    const result = await dishesServices.getDishesByCategory(categoryIndex)
    res.status(HTTP_STATUS.success.OK).json({
      message: DISH_MESSAGE.GET_DISHES_BY_CATEGORY_SUCCESS,
      result
    })
  } catch (err) {
    res.status(HTTP_STATUS.serverError.Internal_Server_Error).json({
      message: 'Error'
    })
  }
}

export const getAvailableDishesControllers = async (req: Request, res: Response) => {
  const result = await dishesServices.getAvailableDishes()
  res.status(HTTP_STATUS.success.OK).json({
    message: DISH_MESSAGE.GET_AVAILABLE_DISHES_SUCCESS,
    result
  })
}
