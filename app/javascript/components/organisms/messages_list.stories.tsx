import * as React from 'react'
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
      room_id: 1,
      created_at: '2018-05-18T11:52:29.241Z',
      updated_at: '2018-05-21T02:58:13.659Z',
    },
    {
      id: 2,
      content: 'bbbbb',
      room_id: 1,
      created_at: '2018-05-18T11:52:29.241Z',
      updated_at: '2018-05-21T02:58:13.659Z',
    },
  ],
  hasNext: true,
  currentPage: 1,
  loading: false,
}
storiesOf('Organisms/MessagesList', module).add('デフォルト', () => (
  <MessagesList
    room={selectedRoom.item}
    messages={messages}
    fetchOldMessagesSync={action('fetchOld')}
    destroyMessage={action('click')}
  />
))
