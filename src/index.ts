/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, NextFunction } from 'express'
const app = express()
import usersRouter from './routes/users.routes.js'
import databaseService from './services/database.services.js'
import defaultErrorHandler from './middlewares/error.middlewares.js'
const port = 3001
app.use(express.json())
databaseService.connect()

app.use('/users', usersRouter)

//Default Error handlers
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
