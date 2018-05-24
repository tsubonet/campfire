import * as React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer } from 'react-router-redux'
import ReactOnRails from 'react-on-rails'
import createHistory from 'history/createBrowserHistory'
import Router from '../components/router'
import configureStore from '../store'
import { SelectedRoom } from '../modules/selected_room'
import { Rooms } from '../modules/rooms'
import { Messages } from '../modules/messages'

export interface RootState {
  selectedRoom: SelectedRoom
  rooms: Rooms
  messages: Messages
}

const history = createHistory()

const App = (props, railsContext) => {
  const store = configureStore(props)

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router />
      </ConnectedRouter>
    </Provider>
  )
}

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  App,
})
