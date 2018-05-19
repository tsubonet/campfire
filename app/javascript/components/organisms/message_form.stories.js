import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import MessageForm from './message_form'
import '../utils/global_style'

const selectedRoom = {
  item: {
    id: 1,
    created_at: '2018-05-18T11:52:29.241Z',
    content: 'aaaa',
  },
}
storiesOf('Organisms/MessageForm', module).add('デフォルト', () => (
  <MessageForm
    room={selectedRoom.item}
    handleSubmit={action('click')}
    //inputRef={el => (this.inputMessageElement = el)}
  />
))
