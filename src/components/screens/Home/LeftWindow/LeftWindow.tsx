import { FC, useEffect, useState } from 'react'

import styles from './LeftWindow.module.scss'

import Preloader from '../../../ui/Preloader/Preloader.js'
import { CompanyProductConfig } from '../Home.interface.js'

import { LeftWindowConfig } from './LeftWindow.interface.js'
import ProseptItem from './ProseptItem/ProseptItem.js'

const LeftWindow: FC<LeftWindowConfig> = ({
  allCompanyProducts,
  selectedGood,
  setSelectedGood,
  isProductCompanyLoading,
  disabled
}) => {
  const [goodsQuantity, setGoodsQuantity] = useState<number>(5)
  const [searchRequest, setSearchRequest] = useState<string>('')
  const [searchGoods, setSearchGoods] =
    useState<Array<CompanyProductConfig>>(allCompanyProducts)

  useEffect(() => {
    setSearchGoods(allCompanyProducts)
  }, [allCompanyProducts])

  return (
    <section className={styles.leftWindow}>
      <input
        disabled={disabled}
        className={styles.search}
        placeholder="Поиск по позициям PROSEPT"
        value={searchRequest}
        onInput={evt => {
          const target = evt.target as HTMLInputElement
          setSearchRequest(target.value)
          const newGoods = allCompanyProducts.filter(
            good =>
              good.article.toLowerCase().includes(target.value.toLowerCase()) ||
              good.name.toLowerCase().includes(target.value.toLowerCase())
          )
          setSearchGoods(newGoods)
        }}
      />
      <label className={styles.blockFilter}>
        Показывать
        <select
          className={styles.filter}
          onChange={evt => {
            setGoodsQuantity(Number(evt.target.value))
          }}
          defaultValue={5}
          disabled={disabled}
        >
          <option value="1">1</option>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="Infinity">Все</option>
        </select>
      </label>
      <ul className={styles.list}>
        {isProductCompanyLoading ? (
          <>
            <Preloader dsReq={true} />
          </>
        ) : (
          searchGoods
            .slice(0, goodsQuantity)
            .map((good, i) => (
              <ProseptItem
                key={good.article}
                article={good.article}
                name={good.name_1c}
                selectedGood={selectedGood}
                productId={good.id}
                setSelectedGood={setSelectedGood}
                serialNumber={i + 1}
              />
            ))
        )}
      </ul>
    </section>
  )
}

export default LeftWindow
