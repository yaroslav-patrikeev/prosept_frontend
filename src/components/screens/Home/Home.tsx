import { FC, useEffect, useState } from 'react'

import styles from './Home.module.scss'

import api from '../../../api/api'
import { NO_SELECT_ERROR, SERVER_ERROR } from '../../../constants/api.constants'
import Layout from '../../layout/Layout'
import Button from '../../ui/Button/Button'
import ModalError from '../../ui/ModalError/ModalError'
import Popup from '../../ui/Popup/Popup'
import Results from '../Results/Results'
import Statistics from '../Statistics/Statistics'

import {
  CompanyProductConfig,
  DealerConfig,
  DealerProductConfig,
  MarkupButtonConfig,
  SelectedGoodConfig
} from './Home.interface'
import LeftWindow from './LeftWindow/LeftWindow'
import RightWindow from './RightWindow/RightWindow'

const Home: FC = () => {
  /**
   * Загрузка всех дилеров, продуктов дилеров,
   * сопоставленных товаров по первому продукту дилера
   */
  useEffect(() => {
    setIsDealersProductsLoading(true)
    setIsDisabled(true)
    Promise.all([
      api.getAllDealers().then(res => {
        setAllDealers(res.data)
      }),
      getAllDealersProducts().then(async res => {
        setDealersProductsList(
          res.data.filter((product: DealerProductConfig) => {
            return (
              product.status === 'waiting' || product.status === 'postponed'
            )
          })
        )
        setIsProductsCompanyLoading(true)
        setIsDealersProductsLoading(false)
        await onChangeCurrentDealersGood(res.data[0].id)
      })
    ]).catch(() => {
      setErrorText(SERVER_ERROR)
    })
  }, [])

  const [allCompanyProducts, setAllCompanyProducts] = useState<
    Array<CompanyProductConfig>
  >([])
  const [allDealers, setAllDealers] = useState<Array<DealerConfig>>([])
  const [allDealersProducts, setAllDealersProducts] = useState<
    Array<DealerProductConfig>
  >([])
  const [isResultOpen, setIsResultOpen] = useState<boolean>(false)
  const [isStatisticsOpen, setIsStatisticsOpen] = useState<boolean>(false)
  const [dealersProductsList, setDealersProductsList] = useState<
    Array<DealerProductConfig>
  >([])
  const [selectedGood, setSelectedGood] = useState<
    SelectedGoodConfig | Record<string, never>
  >({})
  const [errorText, setErrorText] = useState<string>('')
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [isProductsCompanyLoading, setIsProductsCompanyLoading] =
    useState<boolean>(false)
  const [isDealersProductsLoading, setIsDealersProductsLoading] =
    useState<boolean>(false)
  const [history, setHistory] = useState<Array<DealerProductConfig>>([])
  const [isPopupLoading, setIsPopupLoading] = useState<boolean>(false)
  const [startDateHistory, setStartDateHistory] = useState<Date>()
  const [endDateHistory, setEndDateHistory] = useState<Date>()
  const [markedDealersProducts, setMarkedDealersProducts] =
    useState<Array<DealerProductConfig>>()

  /**
   * При изменении текущего товара дилера
   * отправляется запрос на наиболее подходящие
   * продукты компании для сопоставления
   */
  const onChangeCurrentDealersGood = (id: number) => {
    setIsDisabled(true)
    return api
      .getMachineMatching(id)
      .then(res => {
        setAllCompanyProducts(res.data)
        setSelectedGood({})
      })
      .catch(() => {
        setErrorText(SERVER_ERROR)
      })
      .finally(() => {
        setIsProductsCompanyLoading(false)
        setIsDisabled(false)
      })
  }

  /**
   * При клике на кнопку разметки
   * отправляется запрос на изменение
   * статуса в БД
   */
  const onClickMarkup = ({ dealer_product_id, status }: MarkupButtonConfig) => {
    if (status === 'markup' && Object.keys(selectedGood).length === 0) {
      setIsProductsCompanyLoading(false)
      setErrorText(NO_SELECT_ERROR)
      setTimeout(() => setErrorText(''), 2000)
      return
    } else {
      return api
        .markupDealerProduct({
          company_product_id: selectedGood.productId,
          status,
          dealer_product_id,
          serial_number: selectedGood.serialNumber
        })
        .then(res => res.data)
    }
  }

  /**
   * Получить все продукты дилера
   */
  const getAllDealersProducts = () => {
    return api.getAllDealersProducts().then(res => {
      setAllDealersProducts(res.data)
      return res
    })
  }

  /**
   * При клике на кнопку "Результат" или "Статистика"
   * открыть модальное окно, получить список всех продуктов дилера,
   * выбрать только размеченные
   */
  const onResultClick = (type: 'result' | 'statistic') => {
    setIsPopupLoading(true)
    type === 'result' ? setIsResultOpen(true) : setIsStatisticsOpen(true)
    getAllDealersProducts()
      .then(res => {
        setMarkedDealersProducts(
          res.data.filter(
            (product: DealerProductConfig) => product.status !== 'waiting'
          )
        )
      })
      .catch(() => {
        setErrorText('Ошибка на сервере. Попробуйте перезагрузить страницу.')
      })
      .finally(() => {
        setIsPopupLoading(false)
      })
  }

  return (
    <Layout>
      <>
        <div className={styles.main}>
          <LeftWindow
            allCompanyProducts={allCompanyProducts}
            selectedGood={selectedGood}
            setSelectedGood={setSelectedGood}
            isProductCompanyLoading={isProductsCompanyLoading}
            disabled={isDisabled}
          />
          <RightWindow
            allDealers={allDealers}
            setDealersProductsList={setDealersProductsList}
            dealersProductsList={dealersProductsList}
            onClickMarkup={onClickMarkup}
            isDealersProductsLoading={isDealersProductsLoading}
            history={history}
            isDisabled={isDisabled}
            setHistory={setHistory}
            disabled={isDisabled}
            onChangeCurrentDealersGood={onChangeCurrentDealersGood}
            setIsProductsCompanyLoading={setIsProductsCompanyLoading}
          />
        </div>
        <div className={styles.buttonsResult}>
          <Button
            title="Посмотреть результаты разметки"
            style="green"
            onClick={() => {
              onResultClick('result')
            }}
            text="Результаты"
            disabled={isDisabled}
          />
          <Button
            title="Посмотреть статистику качества работы приложения"
            style="green"
            onClick={() => {
              onResultClick('statistic')
            }}
            text="Статистика"
            disabled={isDisabled}
          />
        </div>
        {isResultOpen && (
          <Popup setIsOpen={setIsResultOpen} isPopupLoading={isPopupLoading}>
            <Results
              markedDealersProducts={markedDealersProducts}
              onClickMarkup={onClickMarkup}
              onResultClick={onResultClick}
              startDateHistory={startDateHistory}
              endDateHistory={endDateHistory}
              setStartDateHistory={setStartDateHistory}
              setEndDateHistory={setEndDateHistory}
            />
          </Popup>
        )}
        {isStatisticsOpen && (
          <Popup
            setIsOpen={setIsStatisticsOpen}
            isPopupLoading={isPopupLoading}
          >
            <Statistics allDealersProducts={allDealersProducts} />
          </Popup>
        )}
        <ModalError text={errorText} />
      </>
    </Layout>
  )
}

export default Home
