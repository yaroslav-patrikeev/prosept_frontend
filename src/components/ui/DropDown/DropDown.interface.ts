export interface Dealer {
  value: string
  label: string
}

export interface DropDownProps {
  items: Dealer[]
  onSelect: (selectedValues: string[] | string | null) => void
  placeholder: string
  disabled: boolean
}
