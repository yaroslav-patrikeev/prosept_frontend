export const getTwoDateForCurrentDayPeriod = () => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const currentMonth = d.getMonth()
  const currentDate = d.getDate()

  return {
    start: new Date(currentYear, currentMonth, currentDate, 0, 0, 0),
    end: new Date(currentYear, currentMonth, currentDate, 23, 59, 59)
  }
}
