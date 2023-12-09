import { FC } from 'react'

import styles from './ProseptItem.module.scss'

import { SelectedGoodConfig } from '../../Home.interface'

interface IProseptItem {
  article: string
  name: string
  setSelectedGood: (good: SelectedGoodConfig | Record<string, never>) => void
  selectedGood: SelectedGoodConfig | Record<string, never>
  productId: number
  serialNumber: number
}

const ProseptItem: FC<IProseptItem> = ({
  article,
  name,
  setSelectedGood,
  selectedGood,
  productId,
  serialNumber
}) => {
  return (
    <li>
      <input
        className={styles.radio}
        type="radio"
        name="item"
        id={article}
        checked={selectedGood.productId === productId ? true : false}
        onChange={evt => {
          setSelectedGood({
            productId,
            serialNumber
          })
          const target = evt.target as HTMLInputElement
          if (selectedGood.productId === productId) {
            target.checked = false
            setSelectedGood({})
          }
        }}
      />
      <label htmlFor={article} className={styles.proseptItem}>
        <span>{article}</span>
        <span className={styles.name}>{name}</span>
      </label>
    </li>
  )
}

export default ProseptItem
