import { FC } from 'react'

import styles from './ModalError.module.scss'

interface ModalErrorConfig {
  text: string
}
const ModalError: FC<ModalErrorConfig> = ({ text }) => {
  return (
    <div
      className={`${styles.modalError} ${text ? styles.modalErrorShow : ''}`}
    >
      {text}
    </div>
  )
}

export default ModalError
