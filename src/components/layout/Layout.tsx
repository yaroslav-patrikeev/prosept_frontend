import { FC } from 'react'

import styles from './Layout.module.scss'

import Footer from './Footer/Footer'
import Header from './Header/Header'

interface ILayout {
  children: JSX.Element
}

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
