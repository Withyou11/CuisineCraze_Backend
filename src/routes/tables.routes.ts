import { Router } from 'express'
import {
  createTableController,
  getAllTablesController,
  updateTableController
} from '~/controllers/tables.controllers.js'
import { authorizeManager } from '~/middlewares/roles.middlewares.js'
import { createTableValidator, updateTableValidator } from '~/middlewares/tables.middlewares.js'
import { wrapRequestHandler } from '~/utils/handlers.js'

const tablesRouter = Router()

tablesRouter.use((req, res, next) => {
  next()
})

/**
 * Description. Manager creates new table
 * Path: /create-table
 * Method: POST
 * Body: { table_number: string, capacity: number, status: TableStatus}
 */

tablesRouter.post('/create-table', createTableValidator, authorizeManager, wrapRequestHandler(createTableController))

/**
 * Description. Manager updates table information
 * Path: /update-table
 * Method: PATCH
 * Body: { table_number?: string, capacity?: number, status?: TableStatus}
 */

tablesRouter.patch('/update-table', updateTableValidator, authorizeManager, wrapRequestHandler(updateTableController))

/**
 * Description. Get all tables
 * Path: /get-all-tables
 * Method: GET
 */

tablesRouter.get('/get-all-tables', wrapRequestHandler(getAllTablesController))

export default tablesRouter
