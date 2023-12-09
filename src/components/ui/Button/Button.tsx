import { FC } from 'react'

import styles from './Button.module.scss'

interface ButtonConfig {
  style: 'green' | 'black'
  onClick: () => void
  text: string
  disabled: boolean
  title: string
}

const Button: FC<ButtonConfig> = ({
  style,
  onClick,
  text,
  disabled,
  title
}) => {
  return (
    <button
      title={title}
      className={`${
        style === 'green' ? styles.greenButton : styles.blackButton
      } ${disabled && styles.disabledButton}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button
