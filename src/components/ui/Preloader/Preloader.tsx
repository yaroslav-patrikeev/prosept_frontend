import { FC } from 'react'

import styles from './Preloader.module.scss'

import preloader from '../../../images/preloader.gif'

interface PreloaderConfig {
  dsReq?: boolean
}

const Preloader: FC<PreloaderConfig> = ({ dsReq }) => {
  return (
    <div className={styles.preloaderWrapper}>
      <img src={preloader} alt="preloader" />
      {dsReq && (
        <p className={styles.please}>Пожалуйста, не перезагружайте страницу</p>
      )}
    </div>
  )
}

export default Preloader
