import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Provider } from 'react-redux'
import EditRoomForm from './edit_room_form'
//import { store } from '../../packs/entry'
import '../utils/global_style'

const initialValues = {
  id: 1,
  name: 'aaaa',
}
storiesOf('Organisms/EditRoomForm', module).add('デフォルト', () => ({}))
