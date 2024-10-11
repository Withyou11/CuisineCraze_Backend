/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express'
const app = express()
import usersRouter from './routes/users.routes.js'
import databaseService from './services/database.services.js'
const port = 3001
app.use(express.json())

app.use('/users', usersRouter)

databaseService.connect()

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
