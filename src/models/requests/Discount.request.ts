import { DiscountStatus } from '~/constants/enum.js'

export interface CreateDiscountReqBody {
  code: string
  description?: string
  discount_percentage: number
  image: string
  number_of_use: number
  status: DiscountStatus
  start_date: Date
  end_date: Date
}
