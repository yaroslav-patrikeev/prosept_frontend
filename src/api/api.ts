import axios, { AxiosInstance } from 'axios'

import { BASE_URL } from '../constants/api.constants'

interface MarkupDealerProductConfig {
  company_product_id?: number | null
  status: 'markup' | 'unclaimed' | 'postponed' | 'waiting'
  dealer_product_id: number
  serial_number: number
}

class Api {
  axios: AxiosInstance
  constructor() {
    this.axios = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  getAllCompanyProducts() {
    return this.axios.get('/company/products/')
  }

  getAllDealers() {
    return this.axios.get('/dealers/')
  }

  markupDealerProduct(params: MarkupDealerProductConfig) {
    if ((params.company_product_id, params.serial_number)) {
      return this.axios.put(
        `/dealers/products/${params.dealer_product_id}/${params.status}/`,
        {
          company_product_id: params.company_product_id,
          serial_number: params.serial_number
        }
      )
    } else {
      return this.axios.put(
        `/dealers/products/${params.dealer_product_id}/${params.status}/`
      )
    }
  }

  getAllDealersProducts() {
    return this.axios.get(`/dealers/products/`)
  }

  getMachineMatching(dealer_product_id: number) {
    return this.axios.get(`/company/machine-matching/${dealer_product_id}`)
  }
}

export default new Api()
