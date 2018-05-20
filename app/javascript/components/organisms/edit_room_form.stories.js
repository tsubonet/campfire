import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Provider } from 'react-redux'
import EditRoomForm from './edit_room_form'
import configureStore from '../../store'
import '../utils/global_style'

const store = configureStore()
const initialValues = {
  id: 1,
  name: 'aaaa',
}
storiesOf('Organisms/EditRoomForm', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('デフォルト', () => (
    <EditRoomForm onSubmit={action('onsubmit')} initialValues={initialValues} />
  ))
