import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import EditRoomForm from './edit_room_form'
import '../utils/global_style'

const initialValues = {
  id: 1,
  name: 'aaaa',
}
storiesOf('Organisms/EditRoomForm', module).add('デフォルト', () => (
  <EditRoomForm onSubmit={action('click')} initialValues={initialValues} />
))
