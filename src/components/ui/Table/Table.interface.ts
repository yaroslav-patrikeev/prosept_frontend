import { MarkupButtonConfig } from '../../screens/Home/Home.interface'

export interface TableConfig {
  id: number
  name: string
  link: string
  status: string
  productMap: string
  numberInList: number
  date_status: Date
}

export interface TableProps {
  data: Array<TableConfig> | undefined
  onClickMarkup: ({
    dealer_product_id,
    status
  }: MarkupButtonConfig) => Promise<void> | undefined
  startDate: Date
  endDate: Date
  onResultClick: (type: 'result' | 'statistic') => void
}
