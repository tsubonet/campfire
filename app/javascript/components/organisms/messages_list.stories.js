import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import MessagesList from './messages_list'
import Time from '../atoms/time'
import Txt from '../atoms/txt'
import '../utils/global_style'

const selectedRoom = {
  item: {
    id: 1,
    created_at: '2018-05-18T11:52:29.241Z',
    content: 'aaaa',
  },
}
const messages = {
  items: [
    {
      id: 1,
      content: 'aaaaa',
      created_at: '2018-05-18T11:52:29.241Z',
    },
    {
      id: 2,
      content: 'bbbbb',
      created_at: '2018-05-18T11:52:29.241Z',
    },
  ],
}
storiesOf('Organisms/MessagesList', module).add('デフォルト', () => (
  <MessagesList
    room={selectedRoom.item}
    messages={messages}
    fetchOldMessagesSync={action('click')}
  />
))
