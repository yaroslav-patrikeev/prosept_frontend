import { FC } from 'react'

import styles from './Footer.module.scss'

const Footer: FC = () => {
  return (
    <footer className={`${styles.footer} `}>
      <div className={styles.footerContainer}>
        <p className={`${styles.text} `}>
          © {String(new Date().getFullYear())}, PROSEPT
        </p>
      </div>
    </footer>
  )
}

export default Footer
