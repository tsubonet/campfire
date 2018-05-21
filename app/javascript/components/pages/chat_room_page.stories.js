import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import ChatRoomPage from './chat_room_page'
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
  selectedRoom: {
    loading: true,
    item: {
      id: 1,
      name: 'room1',
    },
  },
}
const history = createHistory()
const store = configureStore(props)

window.App = window.App || {}
window.App.cable = window.App.cable || {}
//window.App.cable.subscriptions.create = action('mock')

storiesOf('Pages/ChatRoomPage', module)
  .addDecorator(story => (
    <Provider store={store}>
      <ConnectedRouter history={history}>{story()}</ConnectedRouter>
    </Provider>
  ))
  .add('デフォルト', () => <ChatRoomPage />)
