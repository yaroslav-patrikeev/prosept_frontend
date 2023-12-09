import { DealerProductConfig, MarkupButtonConfig } from '../Home/Home.interface'

export interface ResultsConfig {
  markedDealersProducts: Array<DealerProductConfig> | undefined
  onClickMarkup: ({
    dealer_product_id,
    status
  }: MarkupButtonConfig) => Promise<void> | undefined
  onResultClick: (type: 'result' | 'statistic') => void
  startDateHistory: Date | undefined
  endDateHistory: Date | undefined
  setStartDateHistory: (date: Date) => void
  setEndDateHistory: (date: Date) => void
}
