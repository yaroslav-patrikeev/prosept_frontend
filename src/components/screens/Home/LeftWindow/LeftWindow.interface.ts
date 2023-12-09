import { CompanyProductConfig, SelectedGoodConfig } from '../Home.interface'

export interface LeftWindowConfig {
  allCompanyProducts: Array<CompanyProductConfig>
  selectedGood: SelectedGoodConfig | Record<string, never>
  setSelectedGood: (good: SelectedGoodConfig | Record<string, never>) => void
  isProductCompanyLoading: boolean
  disabled: boolean
}
