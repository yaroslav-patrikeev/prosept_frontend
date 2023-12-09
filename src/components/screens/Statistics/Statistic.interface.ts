import { DealerProductConfig } from '../Home/Home.interface'

export interface StatisticConfig {
  allDealersProducts: Array<DealerProductConfig>
}

export interface StatisticAverageConfig {
  number: number
}

export interface statisticDataConfig {
  markup: number
  unclaimed: number
  postponed: number
  waiting: number
}
