import moment from 'moment'

export const formatDate = (date: Date): string => {
  const today = moment().endOf('day')
  const tomorrow = moment()
    .add(1, 'day')
    .endOf('day')

  if (moment(date) < today) return 'Today'
  if (moment(date) < tomorrow) return 'Tomorrow'
  return 'Later'
}
