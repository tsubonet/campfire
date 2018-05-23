import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import EditRoomPage from './edit_room_page'
import configureStore from '../../store'
import '../utils/global_style'

const props = {
  rooms: {
    items: [
      {
        id: 1,
        name: 'room1',
      },
      {
        id: 2,
        name: 'room2',
      },
    ],
  },
}
const history = createHistory()
const store = configureStore(props)

storiesOf('Pages/EditRoomPage', module)
  .addDecorator(story => (
    <Provider store={store}>
      <ConnectedRouter history={history}>{story()}</ConnectedRouter>
    </Provider>
  ))
  .add('デフォルト', () => <EditRoomPage />)
