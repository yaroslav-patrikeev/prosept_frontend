import { MdDeleteOutline } from 'react-icons/md'

import styles from './Table.module.scss'

import { TableProps } from './Table.interface'

const Table: React.FC<TableProps> = ({
  data,
  onClickMarkup,
  startDate,
  endDate,
  onResultClick
}) => {
  const filteredData = data?.filter(item => {
    return (
      item.date_status.getTime() > startDate.getTime() &&
      item.date_status.getTime() < endDate.getTime()
    )
  })

  if (filteredData?.length === 0) {
    return (
      <p className={styles.badResponse}>
        Нет размеченных товаров за этот период
      </p>
    )
  }

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableNumber}>№</th>
            <th>Товар дилера</th>
            <th>Соответствие</th>
            <th className={styles.tableStatus}>Статус</th>
            <th className={styles.tableNumberInList}>Порядковый номер</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((item, index: number) => {
            return (
              <tr key={index}>
                <td className={styles.tableNumber}>{index + 1}</td>
                <td className={styles.tableGood}>{item.name}</td>
                <td className={styles.tableGood}>
                  {item.productMap === 'undefined'
                    ? 'не установлено'
                    : item.productMap}
                </td>
                <td className={styles.tableStatus}>{item.status}</td>
                <td className={styles.tableNumberInList}>
                  {item.numberInList === 0 ? '—' : item.numberInList}
                </td>
                <td className={styles.deleteIcon}>
                  <button
                    title='Изменить статус товара на "Отложить"'
                    onClick={() => {
                      onClickMarkup({
                        dealer_product_id: item.id,
                        status: 'postponed'
                      })?.then(() => {
                        onResultClick('result')
                      })
                    }}
                    className={
                      item.status === 'Отложить' ? 'disabledButton' : ''
                    }
                    style={{ cursor: 'pointer' }}
                    disabled={item.status === 'Отложить'}
                  >
                    <MdDeleteOutline />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Table
