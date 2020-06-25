import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/ja'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('ja')
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(relativeTime)

export const buildDayjs = (date?: string | number | Dayjs | Date): Dayjs =>
  dayjs(date)
