import { Router } from 'express'
import { UserRole } from '~/constants/enum.js'
import { createTableController } from '~/controllers/tables.controllers.js'
import { authorizeManager } from '~/middlewares/roles.middlewares.js'
import { createTableValidator } from '~/middlewares/tables.middlewares.js'
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

export default tablesRouter
