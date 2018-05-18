import React from 'react'
import { storiesOf } from '@storybook/react'
import Time from './time.tsx'

storiesOf('Atoms/Time', module)
  .add('デフォルト', () => <Time>2018-05-18T11:52:29.241Z</Time>)
  .add('HH:mm', () => <Time format="HH:mm">2018-05-18T11:52:29.241Z</Time>)
  .add('無効な時間表現', () => <Time>無効な時間表現</Time>)
