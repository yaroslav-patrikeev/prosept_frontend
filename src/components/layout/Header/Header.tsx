import { FaArrowDown } from 'react-icons/fa'

import styles from './Header.module.scss'

import logo from '../../../images/prosept-logo.svg'

function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="логотип" width={100} className={styles.logo} />
      <div className={`${styles.boxLeft}`}>
        <span className={styles.dropMenu}>
          Выпадающее меню <FaArrowDown />
        </span>
      </div>
    </header>
  )
}

export default Header
