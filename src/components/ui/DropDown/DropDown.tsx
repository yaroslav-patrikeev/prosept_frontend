import React from 'react'
import Select, {
  CSSObjectWithLabel,
  ControlProps,
  MultiValue
} from 'react-select'

import styles from './DropDown.module.scss'

import { Dealer, DropDownProps } from './DropDown.interface'

const DropDown: React.FC<DropDownProps> = ({
  items,
  onSelect,
  placeholder,
  disabled
}) => {
  const handleSelect = (selectedOptions: MultiValue<Dealer>) => {
    if (selectedOptions) {
      const selectedValues = Array.isArray(selectedOptions)
        ? selectedOptions.map(option => option.value)
        : [selectedOptions.values]

      onSelect(selectedValues)
    } else {
      onSelect(null)
    }
  }

  const customStyles: Record<
    string,
    (
      base: CSSObjectWithLabel,
      props: ControlProps<Dealer, true>
    ) => CSSObjectWithLabel
  > = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#b5e0c3' : provided.borderColor,
      boxShadow: 'none',
      '&:hover': {
        borderColor: state.isFocused ? '#b5e0c3' : provided.borderColor,
        cursor: 'pointer'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#b5e0c3' : 'white',
      '&:hover': {
        cursor: 'pointer'
      }
    }),
    multiValue: provided => ({
      ...provided,
      backgroundColor: '#b5e0c3'
    })
  }

  return (
    <Select
      className={styles.main}
      options={items}
      onChange={handleSelect}
      placeholder={placeholder}
      styles={customStyles}
      isClearable
      isMulti
      isDisabled={disabled}
    />
  )
}

export default DropDown
