import * as React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import ReactOnRails from 'react-on-rails'
import createHistory from 'history/createBrowserHistory'
import Router from '../bundles/router'
import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createEpicMiddleware } from 'redux-observable'
import epics from '../epics'

import room, { Room } from '../modules/room'
import rooms from '../modules/rooms'
import messages, { Messages } from '../modules/messages'

export interface RootState {
  room: Room
  rooms: Room[]
  messages: Messages
}

const history = createHistory()

const App = (props, railsContext) => {
  const middlewares = [routerMiddleware(history), thunk, createEpicMiddleware(epics)]
  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger')
    middlewares.push(logger)
  }
  const rootReducer = combineReducers({
    messages,
    rooms,
    room,
    router: routerReducer,
  })
  const enhancer = compose(applyMiddleware(...middlewares))
  const store = createStore(rootReducer, props, enhancer)

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
