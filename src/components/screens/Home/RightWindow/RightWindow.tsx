import { FC, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import styles from './RightWindow.module.scss'

import Button from '../../../ui/Button/Button'
import DropDown from '../../../ui/DropDown/DropDown'
import Preloader from '../../../ui/Preloader/Preloader'
import { DealerProductConfig } from '../Home.interface'

import { IRightWindow } from './RightWindow.interface'

const RightWindow: FC<IRightWindow> = ({
  allDealers,
  setDealersProductsList,
  dealersProductsList,
  onClickMarkup,
  isDealersProductsLoading,
  isDisabled,
  history,
  setHistory,
  disabled,
  onChangeCurrentDealersGood,
  setIsProductsCompanyLoading
}) => {
  const [backHistory, setBackHistory] = useState<Array<DealerProductConfig>>([])

  /**
   * При нажатии на кнопку разметки записать товар в историю,
   * перейти к следующему продукту дилера и запросить для него
   * новый список товаров для сопоставления
   */
  const handleButtonClick = (
    status: 'markup' | 'unclaimed' | 'postponed' | 'waiting'
  ) => {
    setIsProductsCompanyLoading(true)
    onClickMarkup({
      dealer_product_id: dealersProductsList[0].id,
      status
    })?.then(() => {
      setHistory([dealersProductsList[0], ...history])
      setBackHistory(backHistory.slice(1))
      setDealersProductsList(dealersProductsList.slice(1))
      onChangeCurrentDealersGood(dealersProductsList[1].id)
    })
  }

  /**
   * При изменении списка выбранных дилеров
   * поменять список продуктов дилера
   * отправить запрос на сопоставления для первого продукта в списке
   */
  const handleSelect = (newValue: string | string[] | null) => {
    const temp = allDealers
      .filter(
        dealer => newValue?.includes(dealer.name) || newValue?.length === 0
      )
      .map(dealer =>
        dealer.dealer_product.filter(
          product =>
            product.status === 'waiting' || product.status === 'postponed'
        )
      )
      .flat()
    setDealersProductsList(temp)
    setIsProductsCompanyLoading(true)
    onChangeCurrentDealersGood(temp[0].id)
  }

  return (
    <section className={styles.rightWindow}>
      <DropDown
        items={allDealers.map(dealer => ({
          value: dealer.name,
          label: dealer.name
        }))}
        onSelect={handleSelect}
        placeholder={'Выберите дилера'}
        disabled={disabled}
      />
      <div className={styles.card}>
        {isDealersProductsLoading && <Preloader />}
        {dealersProductsList[0] && !isDealersProductsLoading && (
          <>
            <div className={styles.good}>
              <div className={styles.arrowContainer}>
                {history[0] && (
                  <button
                    title="Вернуться к предыдущему товару дилера"
                    disabled={isDisabled}
                    className={styles.arrow}
                    onClick={() => {
                      setIsProductsCompanyLoading(true)
                      setDealersProductsList([
                        history[0],
                        ...dealersProductsList
                      ])
                      setHistory(history.slice(1))
                      setBackHistory([dealersProductsList[0], ...backHistory])
                      onChangeCurrentDealersGood(history[0].id)
                    }}
                  >
                    <FaArrowLeft />
                  </button>
                )}
              </div>
              <a
                href={dealersProductsList[0].product_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.productName}
                title="Открыть страницу товара"
              >
                {dealersProductsList[0].product_name}
                <p>{dealersProductsList[0].price} ₽</p>
              </a>
              <div className={styles.arrowContainer}>
                {backHistory[0] && (
                  <button
                    title="Перейти к следующему товару дилера"
                    disabled={isDisabled}
                    className={styles.arrow}
                    onClick={() => {
                      setIsProductsCompanyLoading(true)
                      setBackHistory(backHistory.slice(1))
                      setHistory([dealersProductsList[0], ...history])
                      setDealersProductsList(dealersProductsList.slice(1))
                      onChangeCurrentDealersGood(dealersProductsList[1].id)
                    }}
                  >
                    <FaArrowRight />
                  </button>
                )}
              </div>
            </div>

            <div className={styles.buttons}>
              <Button
                title="Товар дилера соответствует товару производителя"
                style="black"
                onClick={() => handleButtonClick('markup')}
                text="Да"
                disabled={isDisabled}
              />
              <Button
                title="Товар дилера не соответствует товару производителя"
                style="black"
                onClick={() => handleButtonClick('unclaimed')}
                text="Нет"
                disabled={isDisabled}
              />
              <Button
                title="Вернуться к этому товару позже"
                style="black"
                onClick={() => handleButtonClick('postponed')}
                text="Отложить"
                disabled={isDisabled}
              />
            </div>
          </>
        )}
        {!dealersProductsList[0] && !isDealersProductsLoading && (
          <p className={styles.endList}>
            Сейчас все товары размечены. Воспользуйтесь кнопкой результаты, если
            желаете внести изменения.
          </p>
        )}
      </div>
    </section>
  )
}

export default RightWindow
