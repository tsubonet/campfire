import * as React from 'react'
import * as moment from 'moment'
import 'moment/locale/ja'
import { containPresenter } from '../utils/hoc'

export const TimePresenter = props => <time {...props} />

export const TimeContainer = ({
  presenter,
  children: value,
  dateTime,
  format = 'MM月DD日(ddd)HH:mm',
  ...props
}) => {
  //value = parseInt(value, 10)
  value = new Date(value)

  var children
  if (!isValid(value)) {
    children = '有効な時間表現ではありません'
  } else {
    children = formatDatetime(value, format)
  }

  if (!dateTime) {
    dateTime = formatDatetime(value)
  }

  return presenter({ children, dateTime, ...props })
}

const Time = containPresenter(TimeContainer, TimePresenter)
export default Time

moment.locale()

function isValid(unixtime) {
  return moment(unixtime, 'x', true).isValid()
}

function formatDatetime(datetime, format = 'YYYY-MM-DDTHH:mm') {
  return moment(datetime).format(format)
}
