import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import createHistory from 'history/createBrowserHistory'
import ChatHeader from './chat_header'
import '../utils/global_style'

const selectedRoom = {
  item: {
    id: 1,
    name: 'room1',
  },
}
const history = createHistory()

storiesOf('Organisms/ChatHeader', module).add('デフォルト', () => (
  <ChatHeader room={selectedRoom.item} history={history} />
))
