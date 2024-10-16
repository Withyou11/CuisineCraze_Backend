import { Collection, Db, MongoClient } from 'mongodb'
import { config } from 'dotenv'
import User from '~/models/schemas/User.schema.js'
import RefreshToken from '~/models/schemas/RefreshToken.schema.js'
import Table from '~/models/schemas/Table.schema.js'
import Dish from '~/models/schemas/Dish.schema.js'
import Discount from '~/models/schemas/Discount.schema.js'
import Order from '~/models/schemas/Order.schema.js'
config()

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cuisinecraze.lbx6u.mongodb.net/?retryWrites=true&w=majority&appName=CuisineCraze`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }

  async connect() {
    try {
      // const db = this.client.db('admin')
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('Error: ', error)
      throw error
    }
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }

  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection(process.env.DB_REFRESH_TOKENS_COLLECTION as string)
  }

  get tables(): Collection<Table> {
    return this.db.collection(process.env.DB_TABLES_COLLECTION as string)
  }

  get dishes(): Collection<Dish> {
    return this.db.collection(process.env.DB_DISHES_COLLECTION as string)
  }

  get discounts(): Collection<Discount> {
    return this.db.collection(process.env.DB_DISCOUNTS_COLLECTION as string)
  }

  get orders(): Collection<Order> {
    return this.db.collection(process.env.DB_ORDERS_COLLECTION as string)
  }
}

// Tạo object từ class DatabaseService
const databaseService = new DatabaseService()
export default databaseService
