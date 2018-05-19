import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import ChatHeader from './chat_header'
import '../utils/global_style'

const selectedRoom = {
  item: {
    id: 1,
    name: 'room1',
  },
}

storiesOf('Organisms/ChatHeader', module).add('デフォルト', () => (
  <ChatHeader room={selectedRoom.item} transitEdit={action('onclick')} />
))
