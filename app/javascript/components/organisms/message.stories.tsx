import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Message from './message'
import Time from '../atoms/time'
import Txt from '../atoms/txt'
import '../utils/global_style'

const item = {
  id: 1,
  created_at: '2018-05-18T11:52:29.241Z',
  content: 'aaaa',
}
storiesOf('Organisms/Message', module).add('デフォルト', () => (
  <ul>
    <Message item={item} destroyMessage={action('onclick')} />
  </ul>
))
