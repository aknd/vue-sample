import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/ja'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.locale('ja')
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

export const buildDayjs = (date?: string | number | Dayjs | Date): Dayjs =>
  dayjs(date)

export const formatDate = (
  date?: string | number | Date,
  format = 'YYYY-MM-DD HH:mm:ss'
): string =>
  buildDayjs(date).format(format)
