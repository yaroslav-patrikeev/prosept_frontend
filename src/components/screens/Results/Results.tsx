import { FC, useState } from 'react'

import { getTwoDateForCurrentDayPeriod } from '../../../utils/getTwoDateForCurrentDayPeriod'
import Period from '../../ui/Period/Period'
import Table from '../../ui/Table/Table'

import { ResultsConfig } from './Results.interface'

const Results: FC<ResultsConfig> = ({
  markedDealersProducts,
  onClickMarkup,
  onResultClick,
  startDateHistory,
  setStartDateHistory,
  endDateHistory,
  setEndDateHistory
}) => {
  const { start, end } = getTwoDateForCurrentDayPeriod()

  const [startDate, setStartDate] = useState(startDateHistory || start)
  const [endDate, setEndDate] = useState(endDateHistory || end)

  const mapStatusToText = (status: string) => {
    switch (status) {
      case 'markup':
        return 'Да'
      case 'postponed':
        return 'Отложить'
      case 'unclaimed':
        return 'Нет'
      default:
        return 'Неизвестно'
    }
  }

  const itemsList = markedDealersProducts?.map(product => ({
    id: product.id,
    name: product.product_name,
    link: product.product_url,
    status: mapStatusToText(product.status),
    productMap: String(product.product?.name_1c),
    numberInList: Number(product.serial_number),
    date_status: new Date(product.date_status)
  }))

  return (
    <div>
      <h3>Результаты</h3>
      <Period
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setStartDateHistory={setStartDateHistory}
        setEndDateHistory={setEndDateHistory}
      />
      {itemsList?.length !== 0 && (
        <Table
          startDate={startDate}
          endDate={endDate}
          data={itemsList}
          onClickMarkup={onClickMarkup}
          onResultClick={onResultClick}
        />
      )}
    </div>
  )
}

export default Results
