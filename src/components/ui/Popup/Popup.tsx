import { useClickAway } from '@uidotdev/usehooks'
import { FC, useEffect } from 'react'
import { MdClose } from 'react-icons/md'

import styles from './Popup.module.scss'

import Preloader from '../Preloader/Preloader'

interface IPopup {
  children: JSX.Element
  setIsOpen: (isOpen: boolean) => void
  isPopupLoading: boolean
}

const Popup: FC<IPopup> = ({ children, setIsOpen, isPopupLoading }) => {
  const ref = useClickAway<HTMLDivElement>(() => {
    setIsOpen(false)
  })

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [setIsOpen])

  return (
    <section className={styles.wrapper}>
      <div className={styles.popup} ref={ref}>
        <button
          className={styles.close}
          onClick={() => {
            setIsOpen(false)
          }}
        >
          <MdClose />
        </button>
        <div className={styles.content}>
          {isPopupLoading ? <Preloader /> : children}
        </div>
      </div>
    </section>
  )
}

export default Popup
