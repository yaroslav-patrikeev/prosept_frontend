import {
  DealerConfig,
  DealerProductConfig,
  MarkupButtonConfig
} from '../Home.interface'

export interface IRightWindow {
  allDealers: Array<DealerConfig>
  setDealersProductsList: (currentProducts: Array<DealerProductConfig>) => void
  dealersProductsList: Array<DealerProductConfig>
  onClickMarkup: ({
    dealer_product_id,
    status
  }: MarkupButtonConfig) => Promise<void> | undefined
  isDealersProductsLoading: boolean
  isDisabled: boolean
  history: Array<DealerProductConfig>
  setHistory: (history: Array<DealerProductConfig>) => void
  disabled: boolean
  onChangeCurrentDealersGood: (id: number) => Promise<void> | undefined
  setIsProductsCompanyLoading: (isLoading: boolean) => void
}
