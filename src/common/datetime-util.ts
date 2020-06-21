import _ from 'lodash'
import 'moment'
import moment, { Moment } from 'moment-timezone'

export const buildMoment = (
  dateTime?: Date | string,
  timeZone?: string
): Moment => {
  const tz = timeZone || moment.tz.guess() || 'Asia/Tokyo'
  if (_.isString(dateTime) && /^\d{4}\/\d{1,2}\/\d{1,2}$/.test(dateTime)) {
    const lengths = dateTime.split('/').map(s => s.length);
    return moment(
      dateTime,
      `YYYY/${'MM'.slice(0, lengths[1])}/${'DD'.slice(0, lengths[2])}`
    ).tz(tz);
  }
  return moment(dateTime).tz(tz)
}
