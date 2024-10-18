/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express'
const app = express()
import usersRouter from './routes/users.routes.js'
import databaseService from './services/database.services.js'
import defaultErrorHandler from './middlewares/error.middlewares.js'
import tablesRouter from './routes/tables.routes.js'
import dishesRouter from './routes/dishes.routes.js'
import discountsRouter from './routes/discounts.routes.js'
import refreshTokenRouter from './routes/refreshToken.routes.js'
const port = 3001
app.use(express.json())
databaseService.connect()

app.use('/users', usersRouter)
app.use('/tables', tablesRouter)
app.use('/dishes', dishesRouter)
app.use('/discounts', discountsRouter)
app.use('/refresh-token', refreshTokenRouter)

//Default Error handlers
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
