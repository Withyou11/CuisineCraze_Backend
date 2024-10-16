import databaseService from './database.services.js'
import { config } from 'dotenv'
import { ObjectId } from 'mongodb'
import { CreateTableReqBody } from '~/models/requests/Table.request.js'
import Table from '~/models/schemas/Table.schema.js'

config()
class TablesService {
  async checkTableExist(table_number: string) {
    const table = await databaseService.tables.findOne({ table_number })
    return Boolean(table)
  }

  async createTable(payload: CreateTableReqBody) {
    await databaseService.tables.insertOne(new Table(payload))
  }
}

const tablesService = new TablesService()
export default tablesService
