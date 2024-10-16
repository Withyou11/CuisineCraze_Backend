import databaseService from './database.services.js'
import { config } from 'dotenv'
import { ObjectId } from 'mongodb'
import { CreateTableReqBody, UpdateTableReqBody } from '~/models/requests/Table.request.js'
import Table from '~/models/schemas/Table.schema.js'

config()
class TablesService {
  async getAllTables() {
    const tables = await databaseService.tables.find().toArray()
    return tables
  }

  async checkTableExist(table_number: string) {
    const table = await databaseService.tables.findOne({ table_number })
    return Boolean(table)
  }

  async createTable(payload: CreateTableReqBody) {
    await databaseService.tables.insertOne(new Table(payload))
  }

  async updateTable(payload: UpdateTableReqBody) {
    const updateFields: any = { ...payload }

    delete updateFields._id
    await databaseService.tables.updateOne(
      { _id: new ObjectId(payload._id) },
      {
        $set: {
          ...updateFields
        },
        $currentDate: {
          updated_at: true
        }
      }
    )
  }
}

const tablesService = new TablesService()
export default tablesService
