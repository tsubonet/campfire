import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { BrowserRouter as Router } from 'react-router-dom'
import Modal from './modal'
import '../utils/global_style'

const rooms = {
  items: [
    {
      id: 1,
      name: 'name1',
    },
    {
      id: 2,
      name: 'name2',
    },
    {
      id: 3,
      name: 'name3',
    },
    {
      id: 4,
      name: 'name4',
    },
  ],
  loading: true,
  errors: ['errorですよ'],
}
storiesOf('Organisms/Modal', module).add('デフォルト', () => (
  <Router>
    <Modal
      loading={rooms.loading}
      errors={rooms.errors}
      label="ルーム名を入力してください"
      closeModal={action('click')}
      isOpen={true}
      handleSubmit={action('onkeydown')}
      //inputRef={el => (this.inputRoomElement = el)}
    />
  </Router>
))
