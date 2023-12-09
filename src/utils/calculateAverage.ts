export const calculateAverage = (data: Record<string, number>): number => {
  let countNumber: number = 0
  let sumMarkups: number = 0
  for (const count of Object.keys(data)) {
    countNumber += Number(data[count]) * Number(count)
    sumMarkups += Number(data[count])
  }
  const average = countNumber / sumMarkups
  return Number(average.toFixed(2))
}
